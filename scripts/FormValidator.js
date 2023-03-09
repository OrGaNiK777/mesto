export default class FormValidator {
	constructor(validSettings) {
		this._validSettings = validSettings;
	}

	_errorShow(formElement, inputElement, errorMessage) {
		// — показывает элемент ошибки;
		// Находим элемент ошибки внутри самой функции
		const errorForm = formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._validSettings.errorClass);
		errorForm.classList.add(this._validSettings.inputErrorClass);
		errorForm.textContent = errorMessage;
	}

	_errorHide(formElement, inputElement) {
		// — скрывает элемент ошибки;
		// Находим элемент ошибки
		const errorForm = formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._validSettings.errorClass);
		errorForm.classList.remove(this._validSettings.inputErrorClass);
		errorForm.reset;
	}

	_checkValid(formElement, inputElement) {
		//— проверяет валидность поля, внутри вызывает showInputError или hideInputError.
		if (inputElement.validity.valid) {
			// получает параметром форму, в которой
			// находится проверяемое поле, и само это поле
			this._errorHide(formElement, inputElement);
		} else {
			// получает параметром форму, в которой
			// находится проверяемое поле, и само это поле
			this._errorShow(formElement, inputElement, inputElement.validationMessage);
		}
	}

	_setEventListeners(formElement) {
		// Найдём все поля формы и сделаем из них массив
		const inputList = Array.from(formElement.querySelectorAll(this._validSettings.inputSelector));
		// Найдём в текущей форме кнопку отправки
		const buttonElement = formElement.querySelector(this._validSettings.submitButtonSelector);
		//чтобы проверить состояние кнопки в самом начале
		this.toggleButtonState(inputList, buttonElement);

		inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkValid(formElement, inputElement);
				// чтобы проверять его при изменении любого из полей
				this.toggleButtonState(inputList, buttonElement);
			});
		});
	}
	_hasInvalid(inputList) {
		// проходим по этому массиву методом some
		return inputList.some((input) => {
			return !input.validity.valid;
		});
	}
	toggleButtonState(inputList, buttonElement) {
		// Если есть хотя бы один невалидный инпут
		if (this._hasInvalid(inputList)) {
			// сделай кнопку неактивной
			buttonElement.setAttribute("disabled", true);
			buttonElement.classList.add(this._validSettings.inactiveButtonClass);
		} else {
			// иначе сделай кнопку активной
			buttonElement.removeAttribute("disabled");
			buttonElement.classList.remove(this._validSettings.inactiveButtonClass);
		}
	}

	enableValid() {
		const formList = Array.from(document.querySelectorAll(this._validSettings.formSelector));
		formList.forEach((formElement) => {
			formElement.addEventListener("submit", (evt) => {
				evt.preventDefault();
			});
			this._setEventListeners(formElement);
		});
	}
}
