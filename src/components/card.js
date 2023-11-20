import { openImagePopup } from './modal.js';

// Шаблон карточки
const cardTemplate = document.getElementById("cardTemplate").content.querySelector('.card');
// контейнер для карточек
const cardContainer = document.querySelector(".cards");

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

export { createCard, addCardToContainer };