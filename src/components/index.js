import '../pages/index.css';
import { createCard } from './card.js';
import { openPopup, closePopup, handleOverlayClick } from './modal.js';
import { enableValidation } from "./validate.js";
import { getUserInfo, updateUserInfo, getCards, updateAvatar, addCard } from "./api.js";

// кнопка редактировать профиль
const editProfileButton = document.querySelector(".profile__button-edit");
//кнопка добавить картинку
const imageAddButton = document.querySelector(".profile__button-add-photo");
// попап редактирования профиля
const popupProfile = document.getElementById("popupProfile");
// попап добавления карточки
const popupAddCard = document.getElementById("popupAddCard");
// попап редактирования Аватара
const popupAvatar = document.getElementById("popupAvatar")
const formAvatar = document.forms.formAvatar;
const avatarButton = document.querySelector(".profile__avatar");
const profileAvatarImage = document.querySelector(".profile__avatar-image");
// массив всех кнопок закрытия попапов
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
// форма редактирования профиля
const formProfile = document.forms.formEditProfile;
// поле редактирования имени
const nameInput = formProfile.elements.profileName;
// поле редактирования информации "о разном"
const jobInput = formProfile.elements.profileAbout;
// поле, куда нужно вставить "имя"
const profileNameText = document.querySelector(".profile__title");
// поле, куда нужно вставить информацию "о разном"
const profileJobText = document.querySelector(".profile__subtitle");
// Форма добавления карточки
const formAddCard = document.forms.formAddCard;
// контейнер для карточек
const cardContainer = document.querySelector(".cards");
const cardName = formAddCard.elements.cardName;
const cardURL = formAddCard.elements.cardURL;
let ownerID = -1;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__button',
  // красное подчеркивание
  inputInvalidClass: 'popup__input_invalid',
}

async function initializeApp() {
  try {
    const [userData, cards] = await Promise.all([getUserInfo(), getCards()]);

    //  данные пользователя
    profileNameText.textContent = userData.name;
    profileJobText.textContent = userData.about;
    profileAvatarImage.src = userData.avatar;
    ownerID = userData._id;

    // создание массива промисов из функции createCard
    const cardPromises = cards.map(card => createCard(card, ownerID));

    // одновременное выполнение всех промисов
    const cardElements = await Promise.all(cardPromises);

    // добавление карточек в контейнер
    cardElements.forEach(cardElement => {
      cardContainer.append(cardElement);
    });
  } catch (err) {
    console.error('Error initializing the app:', err);
  }
}

// обработчик "отправки" формы профиля
async function handleFormSubmitProfile(evt) {
  // отменяем стандартную отправку формы. 
  evt.preventDefault();

  // кнопка "сохранить"
  const submitButton = evt.target.querySelector('.popup__button');

  try {
    // изменяем текст кнопки на "сохранение..."
    submitButton.textContent = 'сохранение...';

    await updateUserInfo(nameInput.value, jobInput.value);
    // новые значения с помощью textContent
    profileNameText.textContent = nameInput.value;
    profileJobText.textContent = jobInput.value;
    closePopup(popupProfile);
  } catch (err) {

    console.error('Error updating user info:', err);

  } finally {
    // возвращаем текст кнопки обратно
    submitButton.textContent = 'Сохранить';
  }
}

// на кнопку редактирования профиля вешаем обработчик который будет открывать попап
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameText.textContent;
  jobInput.value = profileJobText.textContent;
  openPopup(popupProfile);
});

// на кнопку добавления карточки вешаем обработчик который будет открывать попап
imageAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

// добавление карточки
formAddCard.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'сохранение...';

  try {
    const newCard = await addCard(cardName.value, cardURL.value);
    // добавляем новую карточку в DOM, добавляем лайки
    const cardElement = await createCard(newCard, ownerID);
    cardContainer.prepend(cardElement);
    // закрыть попап после добавления карточки
    closePopup(popupAddCard);

  } catch (err) {
    console.error('Error adding new card:', err);

  } finally {
    submitButton.textContent = 'создать';
    // Используем метод reset() для очистки формы 
    evt.target.reset();
  }
});

formAvatar.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'сохранение...';

  try {
    const avatarLink = formAvatar.elements.avatarURL.value;
    await updateAvatar(avatarLink);
    profileAvatarImage.src = avatarLink;
    // закрываем попап только после успешного обновления аватара
    closePopup(popupAvatar);
  } catch (err) {
    console.error('Error updating avatar:', err);

  } finally {
    submitButton.textContent = 'Сохранить';
  }
});


// Прикрепляем обработчик к форме("submit" - «отправка»)
formProfile.addEventListener("submit", handleFormSubmitProfile);

// вешаем обработчки закрытия попапов на все крестики сразу
popupCloseButtons.forEach(popupCloseButton => {
  // находим родительский попап текущей кнопки
  const popupParent = popupCloseButton.closest(".popup");
  // вешаем на текущую кнопку обработчик который будет закрывать её родительский попап
  popupCloseButton.addEventListener('click', () =>
    closePopup(popupParent));

  // Закрытие попапа при клике вне его содержимого
  // обработчик событий на весь попап срабатывает при нажатии кнопки мыши в любом месте попапа
  popupParent.addEventListener('mousedown', handleOverlayClick);

});

enableValidation(validationConfig);

initializeApp();