const showInputError = (settings, formElement, inputElement, errorMessage) => {
	// — показывает элемент ошибки;
	// Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(settings.errorClass);
	errorElement.classList.add(settings.inputErrorClass);
	errorElement.textContent = errorMessage;
};

const hideInputError = (settings, formElement, inputElement) => {
	// — скрывает элемент ошибки;
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(settings.errorClass);
	errorElement.classList.remove(settings.inputErrorClass);
	errorElement.reset;
};

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const checkInputValidity = (settings, formElement, inputElement) => {
	//— проверяет валидность поля, внутри вызывает showInputError или hideInputError.
	if (inputElement.validity.valid) {
		// showInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		hideInputError(settings, formElement, inputElement);
	} else {
		// hideInputError теперь получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		showInputError(settings, formElement, inputElement, inputElement.validationMessage);
	}
};

const hasInvalidInput = (inputList) => {
	// проходим по этому массиву методом some
	return inputList.some((input) => !input.validity.valid);
};

const setEventListeners = (settings, formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
	const buttonElement = formElement.querySelector(settings.submitButtonSelector);
	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(settings, inputList, buttonElement);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkInputValidity(settings, formElement, inputElement);
			// чтобы проверять его при изменении любого из полей
			toggleButtonState(settings, inputList, buttonElement);
		});
	});
};

const toggleButtonState = (settings, inputList, buttonElement) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		// сделай кнопку неактивной
		buttonElement.setAttribute("disabled", "");
		buttonElement.classList.add(settings.inactiveButtonClass);
	} else {
		// иначе сделай кнопку активной
		buttonElement.removeAttribute("disabled", "");
		buttonElement.classList.remove(settings.inactiveButtonClass);
	}
};

const enableValidation = (settings) => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener("submit", () => {});
		setEventListeners(settings, formElement);
	});
};
