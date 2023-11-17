const initialCards = [
  {
    name: 'водичка)',
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
  },
  {
    name: 'лошадка',
    link: 'https://images.unsplash.com/photo-1577936861999-2ee541936e4b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'ещё одна лошадка',
    link: 'https://images.unsplash.com/photo-1539808163380-beb256654c64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'замок',
    link: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'озеро',
    link: 'https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'flowers',
    link: 'https://images.unsplash.com/photo-1490709501740-c7ac36b7d587?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'this was a Hobbit hole',
    link: 'https://images.unsplash.com/photo-1575735409309-e0ecb6088fcd?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: ')',
    link: 'https://plus.unsplash.com/premium_photo-1668723712387-d5076dae388e?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'boo...',
    link: 'https://images.unsplash.com/photo-1635604521676-04f4f46b60e2?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'тыктыктыковка',
    link: 'https://images.unsplash.com/photo-1573051056354-ac3efd32cd67?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: '(((',
    link: 'https://images.unsplash.com/photo-1699804368701-d52e876bf01a?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
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
  popupCloseButton.addEventListener("click", () => {
    closePopup(popupParent);
  });
});

// Прикрепляем обработчик к форме: он будет следить за событием "submit" - «отправка»
formProfile.addEventListener("submit", handleFormSubmitProfile);

// при нажатии на область вне картинки => она закрывается
// добавляем обработчик на '.popup__container' в popupImage
popupImage.addEventListener('click', (evt) => {
  const popupImgContainer = popupImage.querySelector('.popup__image-container');
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
