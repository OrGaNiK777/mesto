import { initialCards } from "../constans/initial_cards.js";
import Card from "../scripts/Card.js";
const сardTemplate = document.querySelector("#AddNewCard-template").content.querySelector(".card");
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
const popupButtonSave = document.querySelector(".popup__button-save");
const submitAddCard = document.querySelector("#submitAddCard");

const popupImg = document.querySelector(".popup-img");
const popupImgImg = popupImg.querySelector(".popup-img__img");

const popupImgTitle = popupImg.querySelector(".popup-img__title");

function openPopup(popup) {
	//добавка класса popup_opened
	popup.classList.add("popup_opened");
	document.addEventListener("keydown", closeEsc);
	popup.addEventListener("mousedown", closeClick);
}

function closePopup(popup) {
	//удаление класса popup_opened
	popup.classList.remove("popup_opened");
	document.removeEventListener("keydown", closeEsc);
	popup.removeEventListener("mousedown", closeClick);
}

buttonsClose.forEach((button) => {
	// находим 1 раз ближайший к крестику попап
	const popup = button.closest(".popup");
	// устанавливаем обработчик закрытия на крестик
	button.addEventListener("click", () => closePopup(popup));
});

const closeClick = (event) => {
	//закрывает модальное окно при клике вне контента окна
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget);
	}
};

const closeEsc = (event) => {
	//закрывает модальное окно при нажатии Esc
	if (event.key === "Escape") {
		const popupOpened = document.querySelector(".popup_opened");
		closePopup(popupOpened);
	}
};

// function toggleLike(event) {
// 	// tag лайка
// 	event.target.classList.toggle("card__icon-like_active");
// }

// function removeCard(event) {
// 	//удаление карты
// 	event.target.closest(".card").remove();
// }

// function fillImagePopup(valueLink, valueName) {
// 	//отправка атрибутов картинки
// 	openPopup(popupImg);
// 	popupImgImg.src = valueLink;
// 	popupImgImg.alt = valueName;
// 	popupImgTitle.textContent = valueName;
// }

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



// function createCard(item) {
// 	//создние карточки и ее возврат
// 	const card = сardTemplate.cloneNode(true);
// 	const cardTitle = card.querySelector(".card__title");
// 	const cardImage = card.querySelector(".card__image");
// 	const cardIconLike = card.querySelector(".card__icon-like");
// 	const cardIconDelete = card.querySelector(".card__icon-delete");
// 	cardTitle.textContent = item.name;
// 	cardImage.src = item.link;
// 	cardImage.alt = item.name;

// 	cardIconLike.addEventListener("click", toggleLike);
// 	cardIconDelete.addEventListener("click", removeCard);
// 	cardImage.addEventListener("click", () => {
// 		fillImagePopup(item.link, item.name);
// 	});

// 	return card;
// }

initialCards.forEach((item) => {
	const cardClass = new Card();
	//выгрузка карт из БД
	const card = cardClass.createCard(item);
	cards.append(card);
});

// const btnEnabled = (button) => {
// 	button.classList.remove("popup__button-save_inactive");
// 	button.removeAttribute("disabled");
// };

const btnDisabled = (button) => {
	button.classList.add("popup__button-save_inactive");
	button.setAttribute("disabled", "");
};

popupNewCardForm.addEventListener("submit", (event) => {
	const cardClass = new Card();
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

// enableValid({
// 	formSelector: ".popup__form",
// 	inputSelector: ".popup__input",
// 	submitButtonSelector: ".popup__button-save",
// 	inactiveButtonClass: "popup__button-save_inactive",
// 	inputErrorClass: "popup__input-error_active",
// 	errorClass: "popup__input_disabled",
// });
