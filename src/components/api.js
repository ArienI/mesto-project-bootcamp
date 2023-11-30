const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-14/',
  headers: {
    // заголовок авторизации, токен
    authorization: '3dbc5122-5e98-455c-88e1-ae0a88f55f6c',
    'Content-Type': 'application/json'
  }
}

// обработка ответв от HTTP-запроса
function handleResponse(res) {
  // проверка статуса ответа
  // свойство ".ok" возвращает "true" - успешное выполнение
  if (res.ok) {
    // если ответ успешен, то вызывается res.json()
    return res.json();
  }
  // если ответ не успешен, сообщение об ошибке, отклоняем промис 
  return Promise.reject(`Ошибка: ${res.status}`);
}

// получаем информацию о пользователе с внешнего сервера
// объявляем стрелочную функцию и экспортируем её
export const getUserInfo = () => {
  // Отправка HTTP-запроса
  // fetch- отправляем запрос
  return fetch(`${config.baseUrl}users/me`, {
    // Заголовки запроса
    headers: config.headers,
    // запрос для получения даннных с сервера, без каких-либо изменений 
    method: 'GET'
  })
    // обработка ответа, проверка на ошибки
    .then(handleResponse)
    .then(data => {
      // обновление данных пользователя
      // меняем на элементы с моей страницы
      document.getElementById('name').textContent = data.name;
      document.getElementById('about').textContent = data.about;
      document.getElementById('avatar').src = data.avatar;
    })
    .catch(err => console.log(err));
}

// Загрузка карточек с сервера
export const getCard = () => {
  return fetch(`${config.baseUrl}cards`, {
    headers: config.headers,
    // запрос для получения даннных с сервера, без каких-либо изменений 
    method: 'GET'
  })
    // обработка ответа, проверка на ошибки
    .then(handleResponse)
}

//  добавление новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}cards`, {
    // method: 'POST'- отправка данных на сервер  
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(handleResponse)
    // добавляем информацию о новой карточке
    .then(newCardData => {
      // возвращаем данные для дальнейшей обработки
      return newCardData;
    })
    .catch(err => console.log(err));
};

// редактирование профиля
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
    // частичное обнавление данных на сервере
    method: 'PATCH',
    // делаем из объекта строку
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    // обработка ответа, проверка на ошибки
    .then(handleResponse)
    .then(updatedUserData => {
      document.getElementById('name').textContent = updatedUserData.name;
      document.getElementById('about').textContent = updatedUserData.about;
    })
    .catch(err => console.log(err));
};


export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    // частичное обнавление данных на сервере
    method: 'PATCH',
    headers: config.headers,
    // делаем из объекта строку
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    // обработка ответа, проверка на ошибки
    .then(handleResponse)
    .then(updatedUserData => {
      document.getElementById('avatar').src = updatedUserData.avatar;
    })
    .catch(err => console.log(err));
};
