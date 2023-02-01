const popupProfile = document.querySelector(".popup-profile");
const popupAddCard = document.querySelector(".popup-add");
const popupImg = document.querySelector(".popup-img");
const inputPopupProfile = document.getElementById("inputPopupProfile");
const inputPopupNewCard = document.getElementById("inputPopupNewCard");
const buttonClosePopupEditProfile = document.getElementById("buttonClosePopupEditProfile"); //кнопка закрыть попап редактирования профиля
const buttonClosePopupAddCard = document.getElementById("buttonClosePopupAddCard"); //кнопка закрыть попап добавления карточки
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку
const popupProfileName = document.getElementById("popupProfileName"); //имя - попап изменить профиль
const popupProfileAbout = document.getElementById("popupProfileAbout"); //о - попап изменить профиль
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const cards = document.querySelector(".cards");
const addCardTemplate = document.querySelector("#AddNewCard-template").content;

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
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];

profileEditButton.addEventListener("click", () => {
	//открытие попап редактирования профиля
	popupProfile.classList.add("popup_opened");
	popupProfileName.value = profileName.textContent;
	popupProfileAbout.value = profileAbout.textContent;
});
// profileEditButton.addEventListener("click", openedPopupProfile);

const closePopupEditProfile = () => {
	//закрытие попап редактирования профиля
	popupProfile.classList.remove("popup_opened");
};
buttonClosePopupEditProfile.addEventListener("click", closePopupEditProfile);

inputPopupProfile.addEventListener("submit", () => {
	//Редактирование, сохранение и закрытие попап редактирования профиля
	closePopupEditProfile();
	profileName.textContent = `${popupProfileName.value}`;
	profileAbout.textContent = `${popupProfileAbout.value}`;
	event.preventDefault();
});

profileAddButton.addEventListener("click", () => {
	//открытие попап добавления карточки
	popupAddCard.classList.add("popup_opened");
});

const closePopupAddCard = () => {
	//закрытие попап добавления карточки
	popupAddCard.classList.remove("popup_opened");
};
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);

function openPopupImg() {
	// открытие попап картинки
	popupImg.classList.add("popup_opened");
}
function closePopupImg() {
	// закрытие попап картинки
	popupImg.classList.remove("popup_opened");
}

function activeLike(evt) {
	// активирование лайка
	evt.target.classList.toggle("card__icon-like_active");
}
function removeCard(e) {
	//удаление карточки
	e.preventDefault();
	document.querySelector(".card").remove();
}

function fullImg(valueLink, valutName) {
	//отправка атрибутов картинки
	popupImg.querySelector(".popup-img__img").src = valueLink;
	popupImg.querySelector(".popup-img__img").alt = valutName;
	popupImg.querySelector(".popup-img__title").textContent = valutName;
}

const inputPopupAddCard = () => {
	//Добавка и закрытие попап добавления карточки
	const title = document.getElementById("popupTitle");
	const link = document.getElementById("popupLink");

	const card = addCardTemplate.querySelector(".card").cloneNode(true);
	card.querySelector(".card__title").textContent = title.value;
	card.querySelector(".card__image").src = link.value;
	card.querySelector(".card__image").alt = title.value;

	card.querySelector(".card__icon-like").addEventListener("click", activeLike);
	card.querySelector(".card__icon-delete").addEventListener("click", removeCard);

	card.querySelector(".card__image").addEventListener("click", () => {
		openPopupImg();
		fullImg(link.value, title.value);
		popupImg.querySelector(".popup-img__button-close").addEventListener("click", closePopupImg);
	});

	cards.prepend(card);
	closePopupAddCard();
	event.preventDefault();
};
inputPopupNewCard.addEventListener("submit", inputPopupAddCard);

function addCardBD() {
	//выгрузка карт из БД
	initialCards.forEach((item) => {
		const card = addCardTemplate.querySelector(".card").cloneNode(true);
		card.querySelector(".card__image").src = item.link;
		card.querySelector(".card__image").alt = item.name;
		card.querySelector(".card__title").textContent = item.name;
		cards.append(card);
		card.querySelector(".card__icon-like").addEventListener("click", activeLike);
		card.querySelector(".card__icon-delete").addEventListener("click", removeCard);
		card.querySelector(".card__image").addEventListener("click", () => {
			openPopupImg();
			fullImg(item.link, item.name);
			popupImg.querySelector(".popup-img__button-close").addEventListener("click", closePopupImg);
		});
	});
}
addCardBD();