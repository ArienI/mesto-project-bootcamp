// Импортируем CSS стили
import '../pages/index.css';
// Импортируем функции из модулей
import { createCard } from './card.js';
import { openPopup, closePopup, handleOverlayClick } from './modal.js';
import { enableValidation } from './validate.js';
import { getUserInfo, updateUserInfo, getCards, updateAvatar, addCard } from './api.js';

// Кнопка редактирования профиля
const editProfileButton = document.querySelector('.profile__button-edit');
// Кнопка добавления картинки
const imageAddButton = document.querySelector('.profile__button-add-photo');
// Попап редактирования профиля
const popupProfile = document.getElementById('popupProfile');
// Попап добавления карточки
const popupAddCard = document.getElementById('popupAddCard');
// Попап редактирования аватара
const popupAvatar = document.getElementById('popupAvatar')
// Форма редактирования аватара
const formAvatar = document.forms.formAvatar;
// Кнопка редактирования аватара
const avatarButton = document.querySelector('.profile__avatar');
// Изображение аватара
const profileAvatarImage = document.querySelector('.profile__avatar-image');
// Массив кнопок закрытия попапов
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
// Форма редактирования профиля
const formProfile = document.forms.formEditProfile;
// Поле редактирования имени
const nameInput = formProfile.elements.profileName;
// Поле редактирования информации 'о себе'
const jobInput = formProfile.elements.profileAbout;
// Поле, куда нужно вставить 'имя'
const profileNameText = document.querySelector('.profile__title');
// Поле, куда нужно вставить информацию 'о себе'
const profileJobText = document.querySelector('.profile__subtitle');
// Форма добавления новой карточки
const formAddCard = document.forms.formAddCard;
// Контейнер для карточек
const cardContainer = document.querySelector('.cards');
// Поле редактирования названия карточки
const cardName = formAddCard.elements.cardName;
// Поле редактирования URL карточки
const cardURL = formAddCard.elements.cardURL;
// ID владельца карточки (того, кто создал карточку)
let ownerID = -1;

// Конфигурация для валидации форм
const validationConfig = {
  // CSS селекторы
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__button',
  // CSS класс для красного подчёркивания ошибки
  inputInvalidClass: 'popup__input_invalid',
}

// Функция инициализации приложения
// Тут мы заполняем данные профиля и отображаем карточки при загрузке страницы
async function initializeApp() {
  try {
    const [userData, cards] = await Promise.all([getUserInfo(), getCards()]);

    // Заполнение данных пользователя
    profileNameText.textContent = userData.name;
    profileJobText.textContent = userData.about;
    profileAvatarImage.src = userData.avatar;
    ownerID = userData._id;

    // Отображение карточек
    for (const card of cards) {
      const cardElement = await createCard(card, ownerID);
      cardContainer.append(cardElement);
    }
  } catch (err) {
    console.error('Ошибка инициализации приложения: ', err);
  }
}

// Обработчик отправки формы профиля
async function handleFormSubmitProfile(evt) {
  // Отменяем стандартное поведение формы
  evt.preventDefault();
  // Кнопка 'Сохранить'
  const submitButton = evt.submitter;
  // Изменяем текст кнопки на 'Сохранение...'
  submitButton.textContent = 'Сохранение...';
  // Делаем кнопку 'Создать' не активной пока идёт сохранение
  submitButton.disabled = true;
  try {
    // Обновляем данные профиля на сервере
    await updateUserInfo(nameInput.value, jobInput.value);
    // Обновляем данные профиля в DOM
    profileNameText.textContent = nameInput.value;
    profileJobText.textContent = jobInput.value;
    closePopup(popupProfile);
  } catch (err) {
    console.error('Ошибка обновления данных профиля: ', err);
  } finally {
    // Возвращаем текст кнопки обратно на 'Сохранить'
    submitButton.textContent = 'Сохранить';
  }
}

// На кнопку редактирования профиля вешаем обработчик который будет открывать попап
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileNameText.textContent;
  jobInput.value = profileJobText.textContent;
  openPopup(popupProfile);
});

// На аватар вешаем обработчик который будет открывать попап обновления аватара
avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
});

// На кнопку добавления карточки вешаем обработчик который будет открывать попап
imageAddButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// На форму добавления карточки вешаем обработчик который будет добавлять карточку
formAddCard.addEventListener('submit', async (evt) => {
  // Отменяем стандартное поведение формы
  evt.preventDefault();
  const submitButton = evt.submitter;
  // Изменяем текст кнопки на 'Сохранение...'
  submitButton.textContent = 'Сохранение...';
  // Делаем кнопку 'Создать' не активной пока идёт сохранение
  submitButton.disabled = true;
  try {
    // Добавляем новую карточку на сервер
    const newCard = await addCard(cardName.value, cardURL.value);
    // Добавляем новую карточку в DOM
    const cardElement = await createCard(newCard, ownerID);
    cardContainer.prepend(cardElement);
    // Закрываем попап после добавления карточки
    closePopup(popupAddCard);
    // Используем метод reset() для очистки формы если добавление карточки успешное
    evt.target.reset();
  } catch (err) {
    console.error('Ошибка добавления новой карточки: ', err);
  } finally {
    submitButton.textContent = 'Создать';
  }
});

// На форму обновления аватара вешем обработчик который будет обновлять аватар
formAvatar.addEventListener('submit', async (evt) => {
  // Отменяем стандартное поведение формы
  evt.preventDefault();
  // Кнопка 'Сохранить'
  const submitButton = evt.submitter;
  // Изменяем текст кнопки на 'Сохранение...'
  submitButton.textContent = 'Сохранение...';
  // Делаем кнопку 'Создать' не активной пока идёт сохранение
  submitButton.disabled = true;
  try {
    // Ссылка на новый аватар
    const avatarLink = formAvatar.elements.avatarURL.value;
    // Обновляем аватар на сервере
    await updateAvatar(avatarLink);
    // Обновляем аватар в DOM
    profileAvatarImage.src = avatarLink;
    // Закрываем попап только после успешного обновления аватара
    closePopup(popupAvatar);
  } catch (err) {
    console.error('Ошибка обновления аватара: ', err);
  } finally {
    submitButton.textContent = 'Сохранить';
  }
});

// На форму обновления профиля вешаем обработчик который обновлять профиль
formProfile.addEventListener('submit', handleFormSubmitProfile);

// Вешаем обработчки закрытия попапов на все крестики попапов сразу
popupCloseButtons.forEach(popupCloseButton => {
  // Находим родительский попап текущей кнопки
  const popupParent = popupCloseButton.closest('.popup');
  // Вешаем на текущую кнопку обработчик который будет закрывать её родительский попап
  popupCloseButton.addEventListener('click', () =>
    closePopup(popupParent));
  // Закрытие попапа при клике вне его содержимого
  // Обработчик событий на весь попап срабатывает при нажатии кнопки мыши в любом месте попапа
  popupParent.addEventListener('mousedown', handleOverlayClick);
});

// Включаем валидацию форм
enableValidation(validationConfig);
// Запускаем инициализацию приложения
initializeApp();