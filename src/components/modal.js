// Находим элемент изображения в попапе
const popupImageElement = document.querySelector(".popup__img");
// Находим элемент заголовка в попапе
const popupTitleElement = document.querySelector(".popup__img-title");

function openPopup(popup) {
  // Открываем попап
  popup.classList.add("popup_opened");
  // Вешаем на весь документ обработчик на нажатие Escape
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  // Закрываем попап
  popup.classList.remove("popup_opened");
  // удаляем обработчик на нажатие Escape
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  // Если нажата Escape, закрываем popup
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function handleOverlayClick(evt) {
  // Если нажата Escape, закрываем popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
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

export { openPopup, closePopup, openImagePopup, handleOverlayClick };