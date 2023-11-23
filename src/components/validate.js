// функция, которая прячет ошибку
function hideError(inputField, validationConfig) {
  const spanId = 'error-' + inputField.id;
  const spanElement = document.getElementById(spanId);
  spanElement.textContent = '';
  inputField.classList.remove(validationConfig.inputInvalidClass)
}

// функция, которая показывает ошибку
function showError(inputField, errorMessage, validationConfig) {
  const spanId = 'error-' + inputField.id;
  const spanElement = document.getElementById(spanId);
  spanElement.textContent = errorMessage;
  inputField.classList.add(validationConfig.inputInvalidClass)
}

//проверяем ошибки
function handleInput(inputElement, validationConfig) {
  // const inputElement = evt.target;
  // console.log(inputElement.validity);
  if (inputElement.validity.valid) {
    // функция, которая прячет ошибку
    hideError(inputElement, validationConfig);
    // console.log('Валидно');
  } else {
    // функция, которая показывает ошибку
    showError(inputElement, inputElement.validationMessage, validationConfig);
    // console.log('ошибка в поле:', inputElement.validationMessge);
  }
}

// получаем кнопку для включения
function enableButton(button) {
  // disabled - атрибут делающий кнопку неактивной
  button.disabled = false
}

// получаем кнопку для выключения
export function disableButton(button) {
  // disabled - атрибут делающий кнопку неактивной
  button.disabled = true
}

// вкл/выкл кнопки
function checkForm(form, button) {
  // checkValidity- метод возвращает true, если вся-вся форма валидна
  if (form.checkValidity()) {
    enableButton(button) // включить
  } else {
    disableButton(button) //выключить
  }
}


/*//функция очистки формы при перезвгрузке
export function resetError(form, validationConfig) {
  const inputList = form.querySelectorAll(validationConfig.inputSelector); // нашли все input
  const submitButton = form.querySelector(validationConfig.submitSelector); // нашли кнопку (/и?)
  checkForm(form, submitButton); // для того, что бы при перезагрузке страницы кнопка сразу была не активной
  inputList.forEach(input => {
    //установили слушатель
    hideError(input, validationConfig);
  });
};*/

// функция активирующая валидацию всех форм нашего приложения
export function enableValidation(validationConfig) {
  // найдем все формы
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach(form => {
    const inputList = form.querySelectorAll(validationConfig.inputSelector); // нашли все input
    const submitButton = form.querySelector(validationConfig.submitSelector); // нашли кнопку (/и?)
    checkForm(form, submitButton); // для того, что бы при перезагрузке страницы кнопка сразу была не активной
    inputList.forEach(input => {
      //установили слушатель
      input.addEventListener('input', () => {
        handleInput(input, validationConfig);
        checkForm(form, submitButton)
      });
    });
  })
}