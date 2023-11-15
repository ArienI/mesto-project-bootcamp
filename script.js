const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
// контейнер для карточек
const elementContainer = document.querySelector(".element__container");
// Шаблон карточки
const cardTemplate = document.getElementById("cardTemplate").content.querySelector('.element');
// кнопка""корзинка" для удаления картинки
const deleteCard = document.querySelectorAll(".place__delete-button");

// Обработка лайков
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
  nameInput.value = profileNameText.textContent;
  jobInput.value = profileJobText.textContent;
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
  // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
  evt.preventDefault();
  // Вставьте новые значения с помощью textContent
  profileNameText.textContent = nameInput.value;
  profileJobText.textContent = jobInput.value;
  popupProfile.classList.remove("popup_opened");
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

// при нажатии на Escape открытый попап должен закрываться
// добавляем обработчик событий на весь документ
document.addEventListener("keydown", (evt) => {
  // проверяем, является ли нажатая клавиша Esc
  if (evt.key === "Escape") {
    // ищет элемент с классом .popup_opened
    const openedPopup = document.querySelector(".popup_opened");
    //  если находит, то условие выполняется
    if (openedPopup) {
      // удалем .popup_opened у найденого элемента
      openedPopup.classList.remove("popup_opened");
    }
  }
});

// добавляем обработчик удаления картинки на корзинку
document.addEventListener("click", function (event) {
  // проверяет, является ли элемент элементом с классом ".button__delete"
  // .matches-метод используется для проверки, соответствует ли элемент определённому CSS-селектору
  // .target- идентификация элемента, вызвавшего событие
  if (event.target.matches(".button__delete")) {
    // если клик сделан по "корзинке", то находит ближайший элемент с классом ".element"
    // .closest  используется для поиска ближайшего родительского элемента, который соответствует заданному CSS-селектору(начинает поиск вверх по иерархии)
    const cardElement = event.target.closest(".element");
    // карточка удаляется из dom
    if (cardElement) {
      cardElement.remove();
    }
  }
});
