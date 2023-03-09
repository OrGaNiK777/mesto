import { initialCards } from "../constans/initial_cards.js";
import Card from "../scripts/Card.js";
import FormValidator from "./FormValidator.js";
import { validSettings } from "../constans/validSettings.js";
import { btnDisabled } from "./FormValidator.js";

// const сardTemplate = document.querySelector("#AddNewCard-template").content.querySelector(".card");
// const card = сardTemplate.querySelector(".card");
const cards = document.querySelector(".cards");

const buttonsClose = document.querySelectorAll(".popup__button-close"); // находим все крестики проекта по универсальному селектору
const popupProfile = document.querySelector(".popup-profile");
const popupProfileName = document.querySelector("#popupProfileName"); //имя - попап изменить профиль
const popupProfileAbout = document.querySelector("#popupProfileAbout"); //о - попап изменить профиль
const popupProfileForm = document.querySelector("#popupProfileForm");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку

const popupAddCard = document.querySelector(".popup-add");
const popupInputTitle = popupAddCard.querySelector("#popupInputTitle");
const popupInputLink = popupAddCard.querySelector("#popupInputLink");
const popupNewCardForm = document.querySelector("#popupNewCardForm");
const submitAddCard = document.querySelector("#submitAddCard");

const popupImg = document.querySelector(".popup-img");
const popupImgImg = popupImg.querySelector(".popup-img__img");

const popupImgTitle = popupImg.querySelector(".popup-img__title");

//const cardClass = new Card();  изучить!

function openPopup(popup) {
	//добавка класса popup_opened
	popup.classList.add("popup_opened");
	document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
	//удаление класса popup_opened
	popup.classList.remove("popup_opened");
	document.removeEventListener("keydown", closeByEsc);
}

const closeOutside = (event) => {
	//закрывает модальное окно при клике вне контента окна
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget);
	}
};

const closeByEsc = (event) => {
	//закрывает модальное окно при нажатии Esc
	if (event.key === "Escape") {
		const popupOpened = document.querySelector(".popup_opened");
		closePopup(popupOpened);
	}
};

buttonsClose.forEach((button) => {
	// находим 1 раз ближайший к крестику попап
	const popup = button.closest(".popup");
	// устанавливаем обработчик закрытия на крестик
	popup.addEventListener("mousedown", closeOutside);
	button.addEventListener("click", () => closePopup(popup));
});

profileEditButton.addEventListener("click", () => {
	//открытие попап редактирования профиля
	openPopup(popupProfile);
	popupProfileName.value = profileName.textContent;
	popupProfileAbout.value = profileAbout.textContent;
});

popupProfileForm.addEventListener("submit", (event) => {
	//Редактирование, сохранение и закрытие попап редактирования профиля
	event.preventDefault();
	closePopup(popupProfile);
	profileName.textContent = `${popupProfileName.value}`;
	profileAbout.textContent = `${popupProfileAbout.value}`;
});

profileAddButton.addEventListener("click", () => {
	//открытие попап добавления карточки
	openPopup(popupAddCard);
});

export function fillImagePopup(valueLink, valueName) {
	//отправка атрибутов картинки
	openPopup(popupImg);
	popupImgImg.src = valueLink;
	popupImgImg.alt = valueName;
	popupImgTitle.textContent = valueName;
}

initialCards.forEach((item) => {
	//выгрузка карт из БД

	const card = cardClass.createCard(item);
	cards.append(card);
});

popupNewCardForm.addEventListener("submit", (event) => {
	//добавка новой карты
	event.preventDefault();
	const item = {
		name: popupInputTitle.value,
		alt: popupInputTitle.value,
		link: popupInputLink.value,
	};
	const card = cardClass.createCard(item);
	cards.prepend(card);
	event.target.reset();
	closePopup(popupAddCard);
	btnDisabled(submitAddCard);
});

const profileFormValid = new FormValidator(validSettings);
profileFormValid.enableValid();
const cardFormValid = new FormValidator(validSettings);
cardFormValid.enableValid();
