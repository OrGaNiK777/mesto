import { fillImagePopup } from "./index.js";

export default class Card {
	static _сardTemplate = document.querySelector("#AddNewCard-template").content;

	constructor() {
		this._toggleLike = this._toggleLike.bind(this);
		this._removeCard = this._removeCard.bind(this);
	}

	createCard(item) {
		//создние карточки и ее возврат
		this._card = Card._сardTemplate.querySelector(".card").cloneNode(true);
		const cardTitle = this._card.querySelector(".card__title");
		const cardImage = this._card.querySelector(".card__image");
		const cardIconLike = this._card.querySelector(".card__icon-like");
		const cardIconDelete = this._card.querySelector(".card__icon-delete");

		cardIconLike.addEventListener("click", this._toggleLike);
		cardIconDelete.addEventListener("click", this._removeCard);
		cardImage.addEventListener("click", () => {
			fillImagePopup(item.link, item.name);
		});

		cardTitle.textContent = item.name;
		cardImage.src = item.link;
		cardImage.alt = item.name;

		return this._card;
	}
	_toggleLike(event) {
		// tag лайка
		event.target.classList.toggle("card__icon-like_active");
	}

	_removeCard() {
		//удаление карты
		this._card.remove();
	}
}
