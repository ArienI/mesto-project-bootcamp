import '../pages/index.css';
import { createCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
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

async function updateProfileData() {
  try {
    const userData = await getUserInfo();
    profileNameText.textContent = userData.name;
    profileJobText.textContent = userData.about;
    profileAvatarImage.src = userData.avatar;
    ownerID = userData._id;
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
}

async function createAndDisplayCards() {
  try {
    const cards = await getCards();
    for (const card of cards) {
      const cardElement = await createCard(card, ownerID);
      cardContainer.append(cardElement);
    }
  } catch (err) {
    console.error('Error fetching cards:', err);
  }
}

// обработчик "отправки" формы профиля
async function handleFormSubmitProfile(evt) {
  // отменяем стандартную отправку формы. 
  evt.preventDefault();
  try {
    await updateUserInfo(nameInput.value, jobInput.value);
    // новые значения с помощью textContent
    profileNameText.textContent = nameInput.value;
    profileJobText.textContent = jobInput.value;
  } catch (err) {
    console.error('Error updating user info:', err);
    // отобразить сообщение об ошибке пользователю
  } finally {
    closePopup(popupProfile);
  }
}

function handleOverlayClick(evt) {
  // Если нажата Escape, закрываем popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
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

  let newCard = await addCard(cardName.value, cardURL.value);
  // добавляем новую карточку в DOM, добавляем лайки
  const cardElement = await createCard(newCard, ownerID);
  cardContainer.prepend(cardElement);
  // закрыть попап после добавления карточки
  closePopup(popupAddCard);

  // очищаем поля формы
  cardName.value = '';
  cardURL.value = '';
});

formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const avatarLink = formAvatar.elements.avatarURL.value;

  updateAvatar(avatarLink)
    .then(() => {
      profileAvatarImage.src = avatarLink;
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err));
});

avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
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

await updateProfileData();
await createAndDisplayCards();