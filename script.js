const initialCards = [
  {
    name: 'водичка',
    link: 'https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: '="._."=',
    link: 'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2F0fGVufDB8fDB8fHww'
  },
  {
    name: 'мухомор',
    link: 'https://images.unsplash.com/photo-1605874575508-504999dcb8fb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'ягодки',
    link: 'https://images.unsplash.com/photo-1667285435809-20941120f9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fCVEMCVCQiVEMCVCNSVEMSU4MXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: '...',
    link: 'https://images.unsplash.com/photo-1670946789981-6e86ae8d0f43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fCVEMCVCRiVEMCVCMCVEMCVCQiVEMSU4QyVEMCVCQyVEMCVCMHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'meow',
    link: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2F0fGVufDB8fDB8fHww'
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
const likeButtons = document.querySelectorAll(".card__like");
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
const cardContainer = document.querySelector(".card__container");
// Шаблон карточки
const cardTemplate = document.getElementById("cardTemplate").content.querySelector('.card');
// кнопка""корзинка" для удаления картинки
const deleteCard = document.querySelectorAll(".card__delete-button");

// Обработка лайков
// вкл/выкл like
function handleClickLikeButton(likeButton) {
  likeButton.classList.toggle("card__like_active");
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
  // проверяет, является ли элемент элементом с классом ".card__delete-button"
  // .matches-метод используется для проверки, соответствует ли элемент определённому CSS-селектору
  // .target- идентификация элемента, вызвавшего событие
  if (event.target.matches(".card__delete-button")) {
    // если клик сделан по "корзинке", то находит ближайший элемент с классом ".element"
    // .closest  используется для поиска ближайшего родительского элемента, который соответствует заданному CSS-селектору(начинает поиск вверх по иерархии)
    const cardElement = event.target.closest(".card");
    // карточка удаляется из dom
    if (cardElement) {
      cardElement.remove();
    }
  }
});
