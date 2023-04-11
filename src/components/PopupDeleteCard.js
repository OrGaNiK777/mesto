import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._form = this._popupSelector.querySelector(".popup__form");
		this._handleSubmit = undefined;
	}

	openPopup({ handleSubmit }) {
		super.openPopup();
		this._handleSubmit = handleSubmit;
	}

	closePopup() {
		super.closePopup();
		this._handleSubmit = undefined;
	}

	setEventListeners() {
		super.setEventListeners();
		this.btn = document.querySelector(".popup__button-save");
		this._form.addEventListener("submit", (event) => {
			event.preventDefault();
			this._handleSubmit();
		});
	}
}
