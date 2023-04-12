import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._form = this._popupSelector.querySelector(".popup__form");
	}

	openPopup({ handleSubmit }) {
		super.openPopup();
		this._handleSubmit = handleSubmit;
	}

	closePopup() {
		super.closePopup();
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
		this._form.querySelector(".popup__button-save").textContent = text;
	}
}
