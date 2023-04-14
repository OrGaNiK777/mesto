import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popup, { handleFormSubmit }) {
		super(popup);
		this._handleFormSubmit = handleFormSubmit;
		this._inputList = this._form.querySelectorAll(".popup__input");
		this._saveButton = this._form.querySelector(".popup__button-save");
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	//вставлять данные в инпуты
	setInputValues(data) {
		this._inputList.forEach((input) => {
			input.value = data[input.name];
		});
	}

	closePopup() {
		super.closePopup();
		this._form.reset();
	}

	_onSubmit = (event) => {
		event.preventDefault();
		this._handleFormSubmit(this._getInputValues());
	};

	setEventListeners() {
		this._form.addEventListener("submit", this._onSubmit);
		super.setEventListeners();
	}

	loading(text) {
		this._saveButton.textContent = text;
	}
}
