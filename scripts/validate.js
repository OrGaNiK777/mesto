const errorShow = (settings, formElement, inputElement, errorMessage) => {
	// — показывает элемент ошибки;
	// Находим элемент ошибки внутри самой функции
	const errorForm = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(settings.errorClass);
	errorForm.classList.add(settings.inputErrorClass);
	errorForm.textContent = errorMessage;
};

const errorHide = (settings, formElement, inputElement) => {
	// — скрывает элемент ошибки;
	// Находим элемент ошибки
	const errorForm = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(settings.errorClass);
	errorForm.classList.remove(settings.inputErrorClass);
	errorForm.reset;
};

const checkValid = (settings, formElement, inputElement) => {
	//— проверяет валидность поля, внутри вызывает showInputError или hideInputError.
	if (inputElement.validity.valid) {
		// получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		errorHide(settings, formElement, inputElement);
	} else {
		// получает параметром форму, в которой
		// находится проверяемое поле, и само это поле
		errorShow(settings, formElement, inputElement, inputElement.validationMessage);
	}
};

const setEventListeners = (settings, formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
	const buttonElement = formElement.querySelector(settings.submitButtonSelector);
	//чтобы проверить состояние кнопки в самом начале
	toggleButtonState(settings, inputList, buttonElement);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkValid(settings, formElement, inputElement);
			// чтобы проверять его при изменении любого из полей
			toggleButtonState(settings, inputList, buttonElement);
		});
	});
};
const hasInvalid = (inputList) => {
	// проходим по этому массиву методом some
	return inputList.some((input) => {
		return !input.validity.valid;
	});
};
const toggleButtonState = (settings, inputList, buttonElement) => {
	// Если есть хотя бы один невалидный инпут
	if (hasInvalid(inputList)) {
		// сделай кнопку неактивной
		buttonElement.setAttribute("disabled", true);
		buttonElement.classList.add(settings.inactiveButtonClass);
	} else {
		// иначе сделай кнопку активной
		buttonElement.removeAttribute("disabled");
		buttonElement.classList.remove(settings.inactiveButtonClass);
	}
};

const enableValid = (settings) => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
		});
		setEventListeners(settings, formElement);
	});
};
