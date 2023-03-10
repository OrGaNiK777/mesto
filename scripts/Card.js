import { fillImagePopup } from "./index.js";

export default class Card {
	constructor(item, templateSelector) {
		this._name = item.name;
		this._link = item.link;
		this._templateSelector = templateSelector;
	}

	_getTemplate() {
		const сardTemplate = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
		return сardTemplate;
	}

	generateCard() {
		//создние карточки и ее возврат
		this._card = this._getTemplate();
		const cardTitle = this._card.querySelector(".card__title");
		const cardImage = this._card.querySelector(".card__image");

		this._setEventListeners();

		cardTitle.textContent = this._name;
		cardImage.src = this._link;
		cardImage.alt = this._name;

		return this._card;
	}

	_setEventListeners() {
		this._card.querySelector(".card__icon-like").addEventListener("click", () => {
			this._toggleLike();
		});
		this._card.querySelector(".card__icon-delete").addEventListener("click", () => {
			this._removeCard();
		});
		this._card.querySelector(".card__image").addEventListener("click", () => {
			fillImagePopup(this._link, this._name);
		});
	}
	_toggleLike() {
		// tag лайка
		this._card.querySelector(".card__icon-like").classList.toggle("card__icon-like_active");
	}

	_removeCard() {
		//удаление карты
		this._card.remove();
		this._card = null;
	}
}
