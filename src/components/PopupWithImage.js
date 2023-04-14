import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popup) {
		super(popup);
		this._popupImg = this._popup.querySelector(".popup-img__img");
		this._popupTitle = this._popup.querySelector(".popup-img__title");
	}

	openPopup(link, name) {
		//отправка атрибутов картинки
		super.openPopup();
		this._popupImg.src = link;
		this._popupImg.alt = name;
		this._popupTitle.textContent = name;
	}
}
