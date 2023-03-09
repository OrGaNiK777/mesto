export default class Card {
	static _getTemplate = document.querySelector("#AddNewCard-template").content.querySelector(".card");

	constructor() {}

	createCard(item) {
		//создние карточки и ее возврат
		const card = сardTemplate.cloneNode(true);
		const cardTitle = card.querySelector(".card__title");
		const cardImage = card.querySelector(".card__image");
		const cardIconLike = card.querySelector(".card__icon-like");
		const cardIconDelete = card.querySelector(".card__icon-delete");
		cardTitle.textContent = item.name;
		cardImage.src = item.link;
		cardImage.alt = item.name;

		cardIconLike.addEventListener("click", toggleLike);
		cardIconDelete.addEventListener("click", removeCard);
		cardImage.addEventListener("click", () => {
			fillImagePopup(item.link, item.name);
		});

		return card;

		function toggleLike(event) {
			// tag лайка
			event.target.classList.toggle("card__icon-like_active");
		}

		function removeCard(event) {
			//удаление карты
			event.target.closest(".card").remove();
		}

		function fillImagePopup(valueLink, valueName) {
			//отправка атрибутов картинки
			openPopup(popupImg);
			popupImgImg.src = valueLink;
			popupImgImg.alt = valueName;
			popupImgTitle.textContent = valueName;
		}
	}
}
