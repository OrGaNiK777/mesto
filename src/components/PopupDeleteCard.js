import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._deleteButton = this._popupSelector.querySelector(".popup-delete__button");
	}

	openPopup() {
		super.openPopup();
	}

	closePopup() {
		super.closePopup();
		this._deleteButton.addEventListener("mousedown",);
	}

	setEventListeners() {
		super.setEventListeners();
	}
}
