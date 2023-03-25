import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this.popup = document.querySelector(popupSelector);
	}
	openPopup(link, name) {
		//отправка атрибутов картинки
		this.popup.querySelector(".popup-img__img").src = link;
		this.popup.querySelector(".popup-img__img").alt = name;
		this.popup.querySelector(".popup-img__title").textContent = name;
		super.openPopup();
	}
}
