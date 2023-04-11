export default class Card {
	constructor(item, thisOwner, { handleCardClick, handleDeleteCard, handleAddLike, handleDeleteLike }, templateSelector) {
		this._name = item.name;
		this._link = item.link;
		this._likes = item.likes;
		this._id = item._id;
		this._owner = item.owner;

		this._thisOwner = thisOwner;

		this._handleDeleteCard = handleDeleteCard;
		this._handleAddLike = handleAddLike;
		this._handleDeleteLike = handleDeleteLike;
		this._handleCardClick = handleCardClick;

		this._templateSelector = templateSelector;
	}

	_getTemplate() {
		const сardTemplate = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
		return сardTemplate;
	}

	toggleLike() {
		// tag лайка
		if (this._likeButton.classList.contains("card__icon-like_active")) this._handleDeleteLike();
		else this._handleAddLike();
	}

	removeCard() {
		//удаление карты
		this._card.remove();
		this._card = null;
	}

	_delete() {
		() => this._handleDeleteCard(this._id);
	}

	_renderLike() {
		this._likes.forEach(() => {
			if (this._thisOwner) {
				this._card.querySelector(".card__icon-like").classList.add("card__icon-like_active");
			}
		});
	}

	_renderDeleteIcon() {
		if (this._thisOwner) {
			this._deleteButton = this._card.querySelector(".card__icon-delete");
			this._deleteButton.classList.add("card__icon-delete_active");
			this._deleteButton.addEventListener("click", () => {
				this._delete();
			});
		}
	}

	//обновить количество лайков
	updateNumberLikes() {
		this._card.querySelector(".card__number-likes").textContent = this._likes.length;
	}

	_setEventListeners() {
		this._cardImage = this._card.querySelector(".card__image");
		this._likeButton = this._card.querySelector(".card__icon-like");
		this._deleteButton = this._card.querySelector(".card__icon-delete");

		this._likeButton.addEventListener("click", () => {
			this.toggleLike();
		});
		this._deleteButton.addEventListener("click", () => {
			this._removeCard();
		});
		this._cardImage.addEventListener("click", () => {
			this._handleCardClick(this._link, this._name);
		});
	}

	generateCard() {
		//создние карточки и ее возврат
		this._card = this._getTemplate();
		const cardTitle = this._card.querySelector(".card__title");
		const cardImage = this._card.querySelector(".card__image");

		this._setEventListeners();
		this._renderDeleteIcon();
		this._renderLike();
		this.updateNumberLikes(this._likes.length);

		cardTitle.textContent = this._name;
		cardImage.src = this._link;
		cardImage.alt = this._name;

		return this._card;
	}
}
