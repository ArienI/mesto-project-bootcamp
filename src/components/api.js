const config = {
  baseUrl: 'https://mesto.nomoreparties.co',
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
  return fetch('https://nomoreparties.co/v1/wbf-cohort-14/users/me', {
    // Заголовки запроса
    headers: config.headers,
    // запрос для получения даннных с сервера, без каких-либо изменений 
    method: 'GET'
  })
    // Обработка ответа:
    .then(handleResponse)
    .then(data => {
      // обновление данных пользователя
      // меняем на элементы с моей страницы
      document.getElementById('name').textContent = data.name;
      document.getElementById('about').textContent = data.about;
      document.getElementById('avatar').src = data.avatar;
      // Использование _id пользователя по необходимости
    })
    .catch(err => console.log(err));
}