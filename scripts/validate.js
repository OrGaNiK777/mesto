const showInputError = (settings, formElement, inputElement, errorMessage) => {
	// — показывает элемент ошибки;
	// Находим элемент ошибки внутри самой функции
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	console.log(`.${inputElement.name}-error`)
	inputElement.classList.add(settings.inputErrorClass);
	errorElement.classList.add(settings.inactiveButtonClass);
	errorElement.textContent = errorMessage;
};

const hideInputError = (settings, formElement, inputElement) => {
	// — скрывает элемент ошибки;
	// Находим элемент ошибки
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(settings.inputErrorClass);
	errorElement.classList.remove(settings.inactiveButtonClass);
	errorMessage.reset;
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

const toggleButtonState = (settings, inputList, buttonElement) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalidInput(inputList)) {
		// сделай кнопку неактивной
		buttonElement.setAttribute("disabled", true);
		buttonElement.classList.add(settings.submitButtonSelector);
	} else {
		// иначе сделай кнопку активной
		buttonElement.setAttribute("disabled", false);
		buttonElement.classList.remove(settings.submitButtonSelector);
	}
};

const setEventListeners = (settings, formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
	// чтобы проверить состояние кнопки в самом начале
	toggleButtonState(settings, inputList, popupButtonSave);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkInputValidity(settings, formElement, inputElement);
			// чтобы проверять его при изменении любого из полей
			toggleButtonState(settings, inputList, popupButtonSave); //?
		});
	});
};
const enableValidation = (settings) => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		setEventListeners(settings, formElement);
	});
};
