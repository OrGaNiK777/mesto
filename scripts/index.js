let popupProfile = document.querySelector(".popup-profile");
let popupAddCard = document.querySelector(".popup-add");
let inputPopupProfile = document.getElementById("inputPopupProfile");
let inputPopupNewCard = document.getElementById("inputPopupNewCard");
let buttonClosePopupEditProfile = document.getElementById(
	"buttonClosePopupEditProfile"
); //кнопка закрыть попап редактирования профиля
let buttonClosePopupAddCard = document.getElementById(
	"buttonClosePopupAddCard"
); //кнопка закрыть попап добавления карточки
let profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
let profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку
let popupProfileName = document.getElementById("popupProfileName"); //имя - попап изменить профиль
let popupProfileAbout = document.getElementById("popupProfileAbout"); //о - попап изменить профиль
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let createCardButton = document.getElementById("createCardButton"); //кнопка создать - попап добавить карточку
let cards = document.querySelector(".cards");
const addCardTemplate = document.querySelector("#AddNewCard-template").content;

const openedPopupProfile = () => {
	//открытие попап редактирования профиля
	popupProfile.classList.add("popup_opened");
	popupProfileName.value = profileName.textContent;
	popupProfileAbout.value = profileAbout.textContent;
};

const closePopupEditProfile = () => {
	//закрытие попап редактирования профиля
	popupProfile.classList.remove("popup_opened");
};

const inputPopupEditProfile = () => {
	//Редактирование, сохранение и закрытие попап редактирования профиля
	closePopupEditProfile();
	profileName.textContent = `${popupProfileName.value}`;
	profileAbout.textContent = `${popupProfileAbout.value}`;
	event.preventDefault();
};

const openedPopupAddCard = () => {
	//открытие попап добавления карточки
	popupAddCard.classList.add("popup_opened");
};

const closePopupAddCard = () => {
	//закрытие попап добавления карточки
	popupAddCard.classList.remove("popup_opened");
};

const inputPopupAddCard = () => {
	//Добавка и закрытие попап добавления карточки
	closePopupAddCard();
	event.preventDefault();
};

const initialCards = [
	{
		name: "Архыз12",
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
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

function addCardBD() {
	initialCards.forEach((item) => {
		const card = addCardTemplate.querySelector(".card").cloneNode(true);
		card.querySelector(".card__image").src = item.link;
		card.querySelector(".card__image").alt = item.name;
		card.querySelector(".card__title").textContent = item.name;
		cards.append(card);
		card.querySelector(".card__icon-like").addEventListener(
			"click",
			(evt) => {
				evt.target.classList.toggle("card__icon-like_active");
			}
		);
		card.querySelector(".card__icon-delete").addEventListener(
			"click",
			() => {
				card.remove();
			}
		);
	});
}
addCardBD();

createCardButton.addEventListener("click", () => {
	const card = addCardTemplate.querySelector(".card").cloneNode(true);
	const title = document.getElementById("popupTitle");
	const link = document.getElementById("popupLink");

	card.querySelector(".card__title").textContent = title.value;
	card.querySelector(".card__image").src = link.value;
	card.querySelector(".card__image").alt = title.value;

	card.querySelector(".card__icon-like").addEventListener("click", (evt) => {
		evt.target.classList.toggle("card__icon-like_active");
	});
	card.querySelector(".card__icon-delete").addEventListener("click", () => {
		card.remove();
	});

	cards.prepend(card);
});

fullScreenImg.addEventListener("click", () => {});

profileEditButton.addEventListener("click", openedPopupProfile);
buttonClosePopupEditProfile.addEventListener("click", closePopupEditProfile);
inputPopupProfile.addEventListener("submit", inputPopupEditProfile);
profileAddButton.addEventListener("click", openedPopupAddCard);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
inputPopupNewCard.addEventListener("submit", inputPopupAddCard);
