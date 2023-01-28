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
	addCard();
	event.preventDefault();
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function addCard(titleValue, linkValue) {
	const addCardTemplate = document.querySelector(
		"#AddNewCard-template"
	).content;
	const addCardElement = addCardTemplate
		.querySelector(".card")
		.cloneNode(true);

	addCardElement.querySelector(".card__title").textContent = titleValue;
	addCardElement.querySelector(".card__image").textContent = linkValue;

	addCardElement
		.querySelector(".card__icon-like")
		.addEventListener("click", function (evt) {
			evt.target.classList.toggle("card__icon-like_active");
		});

	cards.prepend(addCardElement);
}

createCardButton.addEventListener("click", function () {
	const title = document.getElementById("popupTitle");
	const link = document.getElementsById("popupLink");

	addCard(title.value, link.value);
});

profileEditButton.addEventListener("click", openedPopupProfile);
buttonClosePopupEditProfile.addEventListener("click", closePopupEditProfile);
inputPopupProfile.addEventListener("submit", inputPopupEditProfile);
profileAddButton.addEventListener("click", openedPopupAddCard);
buttonClosePopupAddCard.addEventListener("click", closePopupAddCard);
inputPopupNewCard.addEventListener("submit", inputPopupAddCard);
