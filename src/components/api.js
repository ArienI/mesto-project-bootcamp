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

async function getUserInfo() {
  const response = await fetch(`${config.baseUrl}users/me`, {
    headers: config.headers,
    method: 'GET'
  });
  return handleResponse(response);
}

// редактирование профиля
const updateUserInfo = (name, about) => {
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
    .catch(err => console.log(err));
};

async function getCards() {
  try {
    const response = await fetch(`${config.baseUrl}cards`, {
      headers: config.headers,
      method: 'GET'
    });
    return handleResponse(response);
  } catch (err) {
    console.error('Error fetching cards: ', err);
    throw err;
  }
}

//  добавление новой карточки
async function addCard(name, link) {
  try {
    const response = await fetch(`${config.baseUrl}cards`, {
      headers: config.headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
    return handleResponse(response);
  } catch (err) {
    console.error('Error adding card: ', err);
    throw err;
  }
}

// Удаление карточек с сервера
const removeCard = (ID) => {
  return fetch(`${config.baseUrl}cards/${ID}`, {
    headers: config.headers,
    // запрос для получения даннных с сервера, без каких-либо изменений 
    method: 'DELETE'
  })
    // обработка ответа, проверка на ошибки
    .then(handleResponse)
    .catch(err => console.log(err));
}

async function setLike(ID) {
  try {
    const response = await fetch(`${config.baseUrl}cards/likes/${ID}`, {
      headers: config.headers,
      method: 'PUT'
    });
    return handleResponse(response);
  } catch (err) {
    console.error('Error setting like: ', err);
    throw err;
  }
}

async function removeLike(ID) {
  try {
    const response = await fetch(`${config.baseUrl}cards/likes/${ID}`, {
      headers: config.headers,
      method: 'DELETE'
    });
    return handleResponse(response);
  } catch (err) {
    console.error('Error removing like: ', err);
    throw err;
  }
}

const updateAvatar = (avatarLink) => {
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
    .catch(err => console.log(err));
};

export { getUserInfo, updateUserInfo, getCards, addCard, removeCard, setLike, removeLike, updateAvatar };