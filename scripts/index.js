const addCardTemplate = document.querySelector("#AddNewCard-template").content;
const card = addCardTemplate.querySelector(".card");
const cards = document.querySelector(".cards");

//const closeButtons = document.querySelectorAll(".popup__button-close"); // находим все крестики проекта по универсальному селектору
const closeButton = document.querySelector(".popup__button-close");
const popupProfile = document.querySelector(".popup-profile");
const popupProfileName = document.querySelector("#popupProfileName"); //имя - попап изменить профиль
const popupProfileAbout = document.querySelector("#popupProfileAbout"); //о - попап изменить профиль
const inputPopupProfile = document.querySelector("#inputPopupProfile");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку

const popupAddCard = document.querySelector(".popup-add");
const inputPopupTitle = popupAddCard.querySelector("#inputPopupTitle");
const inputPopupLink = popupAddCard.querySelector("#inputPopupLink");
const inputPopupNewCard = document.querySelector("#inputPopupNewCard");
const popupButtonSave = document.querySelector(".popup__button-save");

const popupImg = document.querySelector(".popup-img");
const popupImgImg = popupImg.querySelector(".popup-img__img");
const popupImgTitle = popupImg.querySelector(".popup-img__title");

function openPopup(event) {
	//добавка класса popup_opened
	event.classList.add("popup_opened");
	console.log(event)
	attachModalEvents(event);
}
// closeButtons.forEach((button) => {
// 	// находим 1 раз ближайший к крестику попап
// 	const popup = button.closest(".popup");
// 	// устанавливаем обработчик закрытия на крестик
// 	button.addEventListener("click", () => closePopup(popup));
// });

/*
 * Функция назначает обработчики событий к элементам модального окна при открытии
 */
function attachModalEvents(event) {
	closeButton.addEventListener("click", () => closePopup(event));
	// закрывать модальное окно при нажатии клавиши Escape
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closePopup(event);
		}
	});

	// закрывать модальное окно при клике вне контента модального окна
	//modal.addEventListener("click", handleOutside);
}

//Функция закрывает модальное окно при нажатии клавиши Escape
// function handleEscape(event)

function closePopup(event) {
	console.log(event)
	//удаление класса popup_opened
	event.classList.remove("popup_opened");
}

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

profileEditButton.addEventListener("click", () => {
	//открытие попап редактирования профиля
	openPopup(popupProfile);
	popupProfileName.value = profileName.textContent;
	popupProfileAbout.value = profileAbout.textContent;
});

inputPopupProfile.addEventListener("submit", (event) => {
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

function createCard(item) {
	//создние карточки и ее возврат
	const card = addCardTemplate.cloneNode(true);
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
}

initialCards.forEach((item) => {
	//выгрузка карт из БД
	const card = createCard(item);
	cards.append(card);
});

inputPopupNewCard.addEventListener("submit", (event) => {
	//добавка новой карты

	event.preventDefault();
	const item = {
		name: inputPopupTitle.value,
		alt: inputPopupTitle.value,
		link: inputPopupLink.value,
	};
	const card = createCard(item);
	cards.prepend(card);
	//event.target.reset();
	closePopup(popupAddCard);
});

enableValidation({
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__button-save",
	inactiveButtonClass: "popup__button-save_inactive",
	inputErrorClass: "popup__input-error_active",
	errorClass: "popup__input_disabled",
});
