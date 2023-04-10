export default class FormValidator {
	constructor(validSettings, formElement) {
		this._validSettings = validSettings;
		this._formElement = formElement;
	}

	_errorShow(inputElement, errorMessage) {
		// — показывает элемент ошибки;
		// Находим элемент ошибки внутри самой функции
		const errorForm = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._validSettings.errorClass);
		errorForm.classList.add(this._validSettings.inputErrorClass);
		errorForm.textContent = errorMessage;
	}

	_errorHide(inputElement) {
		// — скрывает элемент ошибки;
		// Находим элемент ошибки
		const errorForm = this._formElement.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._validSettings.errorClass);
		errorForm.classList.remove(this._validSettings.inputErrorClass);
		errorForm.reset;
	}

	_checkValid(inputElement) {
		//— проверяет валидность поля, внутри вызывает showInputError или hideInputError.
		if (inputElement.validity.valid) {
			// получает параметром форму, в которой
			// находится проверяемое поле, и само это поле
			this._errorHide(inputElement);
		} else {
			// получает параметром форму, в которой
			// находится проверяемое поле, и само это поле
			this._errorShow(inputElement, inputElement.validationMessage);
		}
	}

	_setEventListeners() {
		// Найдём все поля формы и сделаем из них массив

		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._validSettings.inputSelector)
		);
		// Найдём в текущей форме кнопку отправки
		this._buttonElement = this._formElement.querySelector(
			this._validSettings.submitButtonSelector
		);
		//чтобы проверить состояние кнопки в самом начале\
		this.toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkValid(inputElement);
				// чтобы проверять его при изменении любого из полей
				this.toggleButtonState();
			});
		});
	}
	_hasInvalid() {
		// проходим по этому массиву методом some
		return this._inputList.some((input) => {
			return !input.validity.valid;
		});
	}
	toggleButtonState() {
		// Если есть хотя бы один невалидный инпут
		if (this._hasInvalid()) {
			// сделай кнопку неактивной
			this._buttonElement.setAttribute("disabled", true);
			this._buttonElement.classList.add(this._validSettings.inactiveButtonClass);
		} else {
			// иначе сделай кнопку активной
			this._buttonElement.removeAttribute("disabled");
			this._buttonElement.classList.remove(this._validSettings.inactiveButtonClass);
		}
		this._buttonElement.setAttribute.reset;
	}

	enableValid() {
		this._setEventListeners();
	}
	resetValidation() {
		this.toggleButtonState(); // управляем кнопкой

		this._inputList.forEach((inputElement) => {
			this._errorHide(inputElement); //очищаем ошибки
		});
	}
}
