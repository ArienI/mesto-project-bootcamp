import { initialCards } from './utils/utils.js';

// кнопка редактировать профиль
const editProfileButton = document.querySelector(".profile__button-edit");
//кнопка добавить картинку
const addPhotoButton = document.querySelector(".profile__button-add-photo");
// попап редактирования профиля
const popupProfile = document.getElementById("popupProfile");
// попап добавления карточки
const popupAddCard = document.getElementById("popupAddCard");
// массив всех кнопок закрытия попапов
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
// массив всех кнопок like
// const likeButtons = document.querySelectorAll(".card__like");
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
// контейнер для карточек
const cardContainer = document.querySelector(".cards");
// Шаблон карточки
const cardTemplate = document.getElementById("cardTemplate").content.querySelector('.card');
// кнопка "корзинка" для удаления картинки
const deleteCard = document.querySelectorAll(".card__delete-button");
// Находим элемент изображения в попапе
const popupImageElement = document.querySelector(".popup__img");
// Находим элемент заголовка в попапе
const popupTitleElement = document.querySelector(".popup__img-title");
// Элемент обертки попапа с картинкой
const popupImage = document.getElementById("popupImage");
// Форма добавления карточки
const formAddCard = document.forms.formAddCard;

function openPopup(popup) {
  // Открываем попап
  popup.classList.add("popup_opened");
  // Вешаем обработчик на нажатие Escape
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  // Закрываем попап
  popup.classList.remove("popup_opened");
  // Не забываем удалить обработчик на нажатие Escape
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  // Если нажата Escape, закрываем popup
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//при клике на область вне формы "редактирования профиля" => она закрывается
// добавляем обработчик на '.popup__container'
popupProfile.addEventListener('click', (evt) => {
  const popupProfileConteiner = popupProfile.querySelector(".popup__container ");
  // проверяем, был ли клик внутри контейнера попапа
  if (!popupProfileConteiner.contains(evt.target)) {
    // закрываем попап
    closePopup(popupProfile);
  }
})

// при клике на область вне формы "новое место" => она закрывается
// добавляем обработчик на '.popup__container'
popupAddCard.addEventListener('click', (evt) => {
  const popupAddCardContainer = popupAddCard.querySelector('.popup__container');
  // проверяем, был ли клик внутри контейнера попапа
  if (!popupAddCardContainer.contains(evt.target)) {
    // закрываем попап
    closePopup(popupAddCard);
  }
});


// обработчик "отправки" формы профиля
function handleFormSubmitProfile(evt) {
  // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  evt.preventDefault();
  // Вставьте новые значения с помощью textContent
  profileNameText.textContent = nameInput.value;
  profileJobText.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Функция для открытия попапа с картинкой
function openImagePopup(name, link) {
  // Устанавливаем ссылку на изображение
  popupImageElement.src = link;
  // Устанавливаем альтернативный текст
  popupImageElement.alt = name;
  // Устанавливаем название изображения
  popupTitleElement.textContent = name;
  // Открываем попап
  openPopup(popupImage);
}

// Функция создания карточки
function createCard(name, link) {
  // cloneNode(true)- клонируем шаблон с дочерними элементами(глубокое клонирование)
  const cardElement = cardTemplate.cloneNode(true);

  const imageElement = cardElement.querySelector(".card__rectangle");
  // устанавливаем ссылку на изображение
  imageElement.src = link;
  // устанавливаем альтернативный текст изображения
  imageElement.alt = name;
  // устанавливаем название
  cardElement.querySelector(".card__caption").textContent = name;

  // Находим кнопку удаления карточки и добавляем обработчик клика
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener('click', () => {
    // удаляем карточку к кототрой эта кнопка относится
    deleteButton.closest(".card").remove();
  });

  // Находим кнопку лайка внутри карточки и добавляем обработчик клика
  const likeButton = cardElement.querySelector(".card__like");
  likeButton.addEventListener('click', () => {
    // переключаем класс card__like_active
    likeButton.classList.toggle("card__like_active");
  });

  // кликабельная картинка, добавляем обработчик клика
  imageElement.addEventListener('click', () => openImagePopup(name, link));

  return cardElement;
}

// Функция добавления карточки в контейнер
function addCardToContainer(cardElement) {
  // prepend - добавляем карточку в начало контейнера
  cardContainer.prepend(cardElement);
}

// на кнопку редактирования профиля вешаем обработчик который будет открывать попап
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameText.textContent;
  jobInput.value = profileJobText.textContent;
  openPopup(popupProfile);
});

// на кнопку добавления карточки вешаем обработчик который будет открывать попап
addPhotoButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

// вешаем обработчки закрытия попапов на все крестики сразу
popupCloseButtons.forEach((popupCloseButton) => {
  // находим родительский попап текущей кнопки
  const popupParent = popupCloseButton.closest(".popup");
  // вешаем на текущую кнопку обработчик который будет закрывать её родительский попап
  popupCloseButton.addEventListener('click', () => {
    closePopup(popupParent);
  });
});

// Прикрепляем обработчик к форме: он будет следить за событием "submit" - «отправка»
formProfile.addEventListener("submit", handleFormSubmitProfile);

// при нажатии на область вне картинки => она закрывается
// добавляем обработчик на '.popup__container' в popupImage
popupImage.addEventListener('click', (evt) => {
  const popupImgContainer = popupImage.querySelector(".popup__image-container");
  // проверяем, был ли клик внутри контейнера попапа
  if (!popupImgContainer.contains(evt.target)) {
    // закрываем попап
    closePopup(popupImage);
  }
});

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
  cardContainer.prepend(newCard);

  // Очищаем форму
  formAddCard.reset();
  // Закрываем попап
  closePopup(popupAddCard);
});


import { enableValidation, disableButton, resetError } from "../components/validation.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__button',
  // красное подчеркивание
  inputInvalidClass: 'popup__input_invalid',
}

enableValidation(validationConfig);

/*отключение кнопки
function handleSubmit(evt) {
  formAddCard.reset()
  disableButton(evt.submitter)
}

formAddCard.addEventListener('submit', handleSubmit)*/