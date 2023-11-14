//import { initialCards } from "./utils/utils";

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
const likeButtons = document.querySelectorAll(".element__like");
// форма редактирования профиля И добавления карточки
const formElement = document.querySelector(".popup__form");
// поле редактирования имени
const nameInput = formElement.querySelector('[name="profileName"]');
// поле редактирования информации "о разном"
const jobInput = formElement.querySelector('[name="profileAbout"]');
// поле, куда нужно вставить "имя"
const profileNameText = document.querySelector(".profile__title");
// поле, куда нужно вставить информацию "о разном"
const profileJobText = document.querySelector(".profile__subtitle");
//контейнер для карточек
const elementContainer = document.querySelector(".element__container");
// Шаблон карточки
const cardTemplate = document.getElementById("cardTemplate").content;

// вкл/выкл like
function handleClickLikeButton(likeButton) {
  likeButton.classList.toggle("element__like_active");
}

// проходимся в цикле по всем кнопкам like и вешаем на них обработчик
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => handleClickLikeButton(likeButton));
});

// на кнопку редактирования профиля вешаем обработчик который будет открывать попап
editProfileButton.addEventListener("click", () => {
  popupProfile.classList.add("popup_opened");
});

// на кнопку добавления карточки вешаем обработчик который будет открывать попап
addPhotoButton.addEventListener("click", () => {
  popupAddCard.classList.add("popup_opened");
});

// вешаем обработчки закрытия попапов на все крестики сразу
popupCloseButtons.forEach((popupCloseButton) => {
  // находим родительский попап текущей кнопки
  const popupParent = popupCloseButton.closest(".popup");
  // вешаем на текущую кнопку обработчик который будет закрывать её родительский попап
  popupCloseButton.addEventListener("click", () => {
    popupParent.classList.remove("popup_opened");
  });
});

// обработчик "отправки" формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.Так мы можем определить свою логику отправки. О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.value; // Получаем значение из поля ввода имени
  let jobValue = jobInput.value; // Получаем значение из поля ввода "о разном"

  // Вставьте новые значения с помощью textContent
  profileNameText.textContent = nameValue;
  profileJobText.textContent = jobValue;
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

// добавляем обработчик событий на весь документ
document.addEventListener("keydown", (evt) => {
  // проверяем, является ли нажатая клавиша Esc
  if (evt.key === "Escape") {
    // ищет элемент с классом .popup_opened
    const openedPopup = document.querySelector(".popup_opened");
    //  если находит, то условие выполняется
    if (openedPopup) {
      // удалем popup_opened у найденого элемента
      openedPopup.classList.remove("popup_opened");
    }
  }
});
