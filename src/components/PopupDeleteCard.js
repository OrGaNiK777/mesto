import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
	constructor(popup) {
		super(popup);
		this._saveButton = this._form.querySelector(".popup__button-save");
	}

	openPopup({ handleSubmit }) {
		super.openPopup();
		this._handleSubmit = handleSubmit;
	}

	_onSubmit = (event) => {
		event.preventDefault();
		this._handleSubmit();
	};

	setEventListeners() {
		this._form.addEventListener("submit", this._onSubmit);
		super.setEventListeners();
	}

	loading(text) {
		this._saveButton.textContent = text;
	}
}
