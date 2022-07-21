// Функция очищения стиля ошибки у поля ввода и отключения спана с ошибкой при открытии модального окна
const clearError = (formElement) => {
  const inputsErrorStyle = formElement.querySelectorAll('.form__item');
  inputsErrorStyle.forEach(errorStyle => errorStyle.classList.remove('form__item_type_error'));
  const errorElements = formElement.querySelectorAll('.form__item-error');
  errorElements.forEach(errorElement => errorElement.textContent = '');
}
// Функция смены текста кнопки при внесении изменений на странице
const renderLoading = (buttonElement, isLoading) => {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

export { clearError, renderLoading }