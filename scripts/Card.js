export default class Card {
	constructor({ item, handleCardClick }, templateSelector) {
		this._name = item.name;
		this._link = item.link;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
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
		this._cardImage = this._card.querySelector(".card__image");
		this._likeButton = this._card.querySelector(".card__icon-like");
		this._deleteButton = this._card.querySelector(".card__icon-delete");

		this._likeButton.addEventListener("click", () => {
			this._toggleLike();
		});
		this._deleteButton.addEventListener("click", () => {
			this._removeCard();
		});
		this._cardImage.addEventListener("click", () => {
			this._handleCardClick(this._link, this._name);
		});
	}
	_toggleLike() {
		// tag лайка
		this._likeButton.classList.toggle("card__icon-like_active");
	}

	_removeCard() {
		//удаление карты
		this._card.remove();
		this._card = null;
	}
}
