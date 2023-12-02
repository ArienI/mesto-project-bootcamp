import { openImagePopup } from './modal.js';
import { removeCard, setLike, removeLike } from "./api.js";

// Шаблон карточки
const cardTemplate = document.getElementById("cardTemplate").content.querySelector('.card');

// Функция создания карточки
async function createCard(card, ownerID) {
  // cloneNode(true)- клонируем шаблон с дочерними элементами(глубокое клонирование)
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__rectangle");
  // находим элемент для отображения количества лайков и устанавливаем его содержимое
  const likeCounterElement = cardElement.querySelector(".card__like-counter");
  // Находим кнопку лайка внутри карточки и добавляем обработчик клика
  const likeButton = cardElement.querySelector(".card__like");

  // устанавливаем ссылку на изображение
  imageElement.src = card.link;
  // устанавливаем альтернативный текст изображения
  imageElement.alt = card.name;
  // устанавливаем название
  cardElement.querySelector(".card__caption").textContent = card.name;
  // устанавливаем количество лайков
  likeCounterElement.textContent = card.likes.length;

  // Если лайк поставила я, то закрашиваем его
  if (card.likes.some(like => like._id === ownerID)) {
    likeButton.classList.add('card__like_active');
  };

  // Находим кнопку удаления карточки и добавляем обработчик клика
  const deleteButton = cardElement.querySelector(".card__delete-button");
  // Корзина должна быть только у меня
  if (card.owner._id === ownerID) {
    deleteButton.addEventListener('click', () => {
      removeCard(card._id)
        .then(() => {
          // удаляем карточку к которой эта кнопка относится
          cardElement.remove();
        });
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', async () => {
    let response;
    if (likeButton.classList.contains('card__like_active')) {
      response = await removeLike(card._id);
      console.log(response);
    } else {
      response = await setLike(card._id);
      console.log(response);
    }
    likeCounterElement.textContent = response.likes.length;
    // переключаем класс card__like_active
    likeButton.classList.toggle('card__like_active');
  });

  // кликабельная картинка, добавляем обработчик клика
  imageElement.addEventListener('click', () => openImagePopup(card.name, card.link));

  return cardElement;
}

export { createCard };

