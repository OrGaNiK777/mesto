export default class Card {
	constructor(item, isOwner, idOwner, { handleCardClick, handleDeleteCard, handleAddLike, handleDeleteLike }, templateSelector) {
		this._name = item.name;
		this._link = item.link;
		this._likes = item.likes;
		this._id = item._id;
		this._owner = item.owner;

		this._isOwner = isOwner;
		this._idOwner = idOwner;

		this._handleDeleteCard = handleDeleteCard;
		this._handleAddLike = handleAddLike;
		this._handleDeleteLike = handleDeleteLike;
		this._handleCardClick = handleCardClick;

		this._templateSelector = templateSelector;

		this._card = this._getTemplate();
		this._cardTitle = this._card.querySelector(".card__title");
		this._likeButton = this._card.querySelector(".card__icon-like");
		this._cardImage = this._card.querySelector(".card__image");
		this._numberLikes = this._card.querySelector(".card__number-likes");
		this._deleteButton = this._card.querySelector(".card__icon-delete");
		this._likeActive = "card__icon-like_active";
		this._deleteActive = "card__icon-delete_active";
	}

	_getTemplate() {
		const сardTemplate = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
		return сardTemplate;
	}

	// tag лайка
	toggleLike() {
		this._likeButton.classList.toggle(this._likeActive);
	}

	// проверка на лайк
	_toggleLike() {
		if (this._likeButton.classList.contains(this._likeActive)) this._handleDeleteLike();
		else this._handleAddLike();
	}

	//удаление карты
	removeCard() {
		this._card.remove();
		this._card = null;
	}

	//обновить количество лайков
	updateNumberLikes(number) {
		this._numberLikes.textContent = number;
	}

	_setEventListeners() {
		this._likeButton.addEventListener("click", () => {
			this._toggleLike();
		});
		this._cardImage.addEventListener("click", () => {
			this._handleCardClick(this._link, this._name);
		});
	}

	//проверка на лайк
	_renderLikeIcon() {
		this._likes.forEach((item) => {
			if (item._id === this._idOwner) {
				this._likeButton.classList.add(this._likeActive);
			}
		});
	}

	//проверка на иконку удаления
	_renderDeleteIcon() {
		if (this._isOwner) {
			this._deleteButton.classList.add(this._deleteActive);
			this._deleteButton.addEventListener("click", () => this._handleDeleteCard(this._id));
		}
	}

	//создние карточки и ее возврат
	generateCard() {
		this.updateNumberLikes(this._likes.length);
		this._setEventListeners();
		this._renderDeleteIcon();
		this._renderLikeIcon();

		this._cardTitle.textContent = this._name;
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;

		return this._card;
	}
}
