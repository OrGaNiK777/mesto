import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupSelector = document.querySelector(popupSelector);
		this._popupImg = this._popupSelector.querySelector(".popup-img__img");
		this._popupTitle = this._popupSelector.querySelector(".popup-img__title");
	}
	openPopup(link, name) {
		//отправка атрибутов картинки
		super.openPopup();
		this._popupImg.src = link;
		this._popupImg.alt = name;
		this._popupTitle.textContent = name;
	}
}
