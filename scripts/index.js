const popupProfile = document.querySelector(".popup-profile");
const popupAddCard = document.querySelector(".popup-add");
const popupImg = document.querySelector(".popup-img");
const inputPopupProfile = document.querySelector("#inputPopupProfile");
const inputPopupNewCard = document.querySelector("#inputPopupNewCard");
const buttonClosePopupEditProfile = document.querySelector("#buttonClosePopupEditProfile"); //кнопка закрыть попап редактирования профиля
const buttonClosePopupAddCard = document.querySelector("#buttonClosePopupAddCard"); //кнопка закрыть попап добавления карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку
const popupProfileName = document.querySelector("#popupProfileName"); //имя - попап изменить профиль
const popupProfileAbout = document.querySelector("#popupProfileAbout"); //о - попап изменить профиль
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const cards = document.querySelector(".cards");
const addCardTemplate = document.querySelector("#AddNewCard-template").content.querySelector(".card");
const popupImgImg = popupImg.querySelector(".popup-img__img");
const popupImgTitle = popupImg.querySelector(".popup-img__title");
const popupButtonClose = popupImg.querySelector(".popup__button-close");
const cardTitle = addCardTemplate.querySelector(".card__title");
const cardImage = addCardTemplate.querySelector(".card__image");
const cardIconLike = addCardTemplate.querySelector(".card__icon-like");
const cardIconDelete = addCardTemplate.querySelector(".card__icon-delete");
const title = document.querySelector("#popupTitle");
const link = document.querySelector("#popupLink");

const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link: "https://s3-alpha-sig.figma.com/img/6826/0b28/cbb12e4149729200748853acc4d16522?Expires=1676246400&Signature=Hmde2a8EO1oqLl7AuS8VXa4ThMEQ-42lAzqU~6koLy9wRMRCmZtG-ZwKfM02c6iclMGl0axsWhHbqgLHyvFIE5N6h2~beksFQ2YePEPLIGgrDS~Lv43vq7QbffEVR9kGH74Qb5PBBHHmNyfRWlF4r5rVa64o0yqsA4C-QLrISrk2s1NkF0WDuWjc6duaAJXj5w~y-aaAqgOcqYRnaPMv3LYKRFpdSrldAM5Rqx9RJVv~lmBYaaUEKF-fVgpByRmbJbVLRfOLt~acmtgqg9A~HRuWKMVbtlOUN9lgNsmQW-1uUUbQkDXJyJGVJAFBzGMlQUrj9Lubuj9xzfADurgv-A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
	},
	{
		name: "Байкал",
		link: "https://s3-alpha-sig.figma.com/img/e2b8/a009/c53230d0dc2229c15d1d262b7906eacc?Expires=1676246400&Signature=nGvVna-2N-iZvhYDJiEGeK7zTNrqXgeLcnUT1cIiK3Gg7tswi7GvhxLr06ypJC-DLWqFOn4COIMhOcvyJ1Umw-wMI3KxH6HlQul4LCp-5lq3xrkXJnt4L8axvriIC-vsM2GNmSKMORttD09cxATz7JJ2zn6uIRB74svDPCq8W1o44bBX9bs1xGh2xVGA6XslZVj9e~fmj8vpdVF36yFt3nRTNGNftxQLFObkdhIyuCs1bOtgR9vM49m1Jk~DRuopbGj7LyawKxwBGoh1qNpdiBJGFSmPSpG6d02AOCVM0~Q6LfOQ5B6Jqt8hryk5PRknJVqyqOcwx2NUFHJUplLkYQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
	},
];

function openPopup(value) {
	value.classList.add("popup_opened");
}

function closePopup(value) {
	value.classList.remove("popup_opened");
}

function toggleLike(evt) {
	// активирование лайка
	evt.target.classList.toggle("card__icon-like_active");
}

function fillImagePopup(valueLink, valueName) {
	//отправка атрибутов картинки
	openPopupImg();
	popupImgImg.src = valueLink;
	popupImgImg.alt = valueName;
	popupImgTitle.textContent = valueName;
}

profileEditButton.addEventListener("click", () => {
	//открытие попап редактирования профиля
	openPopup(popupProfile);
	popupProfileName.value = profileName.textContent;
	popupProfileAbout.value = profileAbout.textContent;
});

buttonClosePopupEditProfile.addEventListener("click", () => {
	//закрытие попап редактирования профиля
	closePopup(popupProfile);
});

inputPopupProfile.addEventListener("submit", () => {
	//Редактирование, сохранение и закрытие попап редактирования профиля
	closePopup(popupProfile);
	profileName.textContent = `${popupProfileName.value}`;
	profileAbout.textContent = `${popupProfileAbout.value}`;
});

inputPopupProfile.addEventListener("submit", (event) => {
	event.preventDefault();
});

profileAddButton.addEventListener("click", () => {
	//открытие попап добавления карточки
	openPopup(popupAddCard);
});

buttonClosePopupAddCard.addEventListener("click", () => {
	//закрытие попап добавления карточки
	closePopup(popupAddCard);
});

function openPopupImg() {
	// открытие попап картинки
	openPopup(popupImg);
}
function closePopupImg() {
	// закрытие попап картинки
	closePopup(popupImg);
}
// function removeCard() {
// 	evt.target.closest('.card').remove()
// }

function createCard(item) {
	// тут создаете карточку и возвращаете ее

	const card = addCardTemplate.cloneNode(true);

	cardTitle.textContent = item.name;
	cardImage.src = item.link;
	cardImage.alt = item.name;

	cardIconLike.addEventListener("click", toggleLike);
	cardIconDelete.addEventListener("click", () => {
		card.remove();
	});
	card.querySelector(".card__image").addEventListener("click", () => {
		fillImagePopup(item.link, item.name);
		popupButtonClose.addEventListener("click", closePopupImg);
	});

	cards.prepend(card);
	closePopup(popupAddCard);
	return card;
}

inputPopupNewCard.addEventListener("submit", (event) => {
	event.preventDefault();
});

initialCards.forEach((item) => {
	const card = createCard(item);
	cards.append(card);
});

inputPopupNewCard.addEventListener("submit", () => {
	const item = {
		name: title.value,
		alt: title.value,
		link: link.value,
	};
	title.value = "";
	link.value = "";
	const element = createCard(item);
	item.prepend(element);
});
