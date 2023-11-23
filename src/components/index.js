import '../pages/index.css';
import { initialCards } from './utils.js';
import { createCard, addCardToContainer } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation } from "./validate.js";

// кнопка редактировать профиль
const editProfileButton = document.querySelector(".profile__button-edit");
//кнопка добавить картинку
const imageAddButton = document.querySelector(".profile__button-add-photo");
// попап редактирования профиля
const popupProfile = document.getElementById("popupProfile");
// попап добавления карточки
const popupAddCard = document.getElementById("popupAddCard");
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
// Элемент обертки попапа с картинкой
const popupImage = document.getElementById("popupImage");
// Форма добавления карточки
const formAddCard = document.forms.formAddCard;

// обработчик "отправки" формы профиля
function handleFormSubmitProfile(evt) {
  // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  evt.preventDefault();
  // Вставьте новые значения с помощью textContent
  profileNameText.textContent = nameInput.value;
  profileJobText.textContent = jobInput.value;
  closePopup(popupProfile);
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

// вешаем обработчки закрытия попапов на все крестики сразу
popupCloseButtons.forEach(popupCloseButton => {
  // находим родительский попап текущей кнопки
  const popupParent = popupCloseButton.closest(".popup");
  // вешаем на текущую кнопку обработчик который будет закрывать её родительский попап
  popupCloseButton.addEventListener('click', () =>
    closePopup(popupParent));

  // Закрытие попапа при клике вне его содержимого
  //  обработчик событий на весь попап срабатывает при нажатии кнопки мыши в любом месте попапа
  popupParent.addEventListener('mousedown', (evt) => {
    //проверяем был ли сделан клик на событии, к которому привязан обрабочик
    if (evt.target === evt.currentTarget) {
      //если условие выполняется, то закрываем popup
      closePopup(popupParent);
    }
  });
});

// Прикрепляем обработчик к форме: он будет следить за событием "submit" - «отправка»
formProfile.addEventListener("submit", handleFormSubmitProfile);


// Добавление начальных карточек из массива
initialCards.forEach((card) => {
  addCardToContainer(createCard(card.name, card.link));
});

// Обработчик отправки формы создания карточки
formAddCard.addEventListener('submit', (evt) => {
  // Предотвращаем стандартное поведение формы
  evt.preventDefault();

  // Получаем название карточки из формы
  const cardName = formAddCard.elements.cardName.value;
  // Получаем ссылку на картинку из формы
  const cardURL = formAddCard.elements.cardURL.value;

  // Создаем новую карточку
  const newCard = createCard(cardName, cardURL);
  // Добавляем новую карточку в начало контейнера карточек
  addCardToContainer(newCard);

  // Очищаем форму
  formAddCard.reset();
  // деактивируем кнопку сохранения
  evt.submitter.disabled = true;
  // Закрываем попап
  closePopup(popupAddCard);
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__button',
  // красное подчеркивание
  inputInvalidClass: 'popup__input_invalid',
}

enableValidation(validationConfig);
