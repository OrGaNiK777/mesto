import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./constans/initial_cards.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { validSettings } from "./constans/validSettings.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";

const cards = document.querySelector(".cards");

//const buttonsClose = document.querySelectorAll(".popup__button-close"); // находим все крестики проекта по универсальному селектору
//const popupProfile = document.querySelector(".popup-profile");
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

//const popupImg = document.querySelector(".popup-img");
//const popupImgImg = popupImg.querySelector(".popup-img__img");
//const popupImgTitle = popupImg.querySelector(".popup-img__title");

// function openPopup(popup) {
// 	//добавка класса popup_opened
// 	popup.classList.add("popup_opened");
// 	document.addEventListener("keydown", closeByEsc);
// }

// function closePopup(popup) {
// 	//удаление класса popup_opened
// 	popup.classList.remove("popup_opened");
// 	document.removeEventListener("keydown", closeByEsc);
// }

// const closeOutside = (event) => {
// 	//закрывает модальное окно при клике вне контента окна
// 	if (event.target === event.currentTarget) {
// 		closePopup(event.currentTarget);
// 	}
// };

// const closeByEsc = (event) => {
// 	//закрывает модальное окно при нажатии Esc
// 	if (event.key === "Escape") {
// 		const popupOpened = document.querySelector(".popup_opened");
// 		closePopup(popupOpened);
// 	}
// };

// buttonsClose.forEach((button) => {
// 	// находим 1 раз ближайший к крестику попап
// 	const popup = button.closest(".popup");
// 	// устанавливаем обработчик закрытия на крестик
// 	//popup.addEventListener("mousedown", closeOutside);
// 	//button.addEventListener("click", () => closePopup(popup));
// });

const userInform = new UserInfo(profileName, profileAbout);

profileEditButton.addEventListener("click", () => {
	//открытие попап редактирования профиля
	popupClassEditProfiles.openPopup();
	const { name, about } = userInform.getUserInfo();
	popupProfileName.value = name;
	popupProfileAbout.value = about;
	profileFormValid.resetValidation();
});

// popupProfileForm.addEventListener("submit", (event) => {
// 	//Редактирование, сохранение и закрытие попап редактирования профиля
// 	event.preventDefault();
// 	popupClassEditProfiles.closePopup();
// 	profileName.textContent = `${popupProfileName.value}`;
// 	profileAbout.textContent = `${popupProfileAbout.value}`;
// });

const popupClassEditProfiles = new PopupWithForm(".popup-profile", {
	handleFormSubmit: () => {
		submitEdit();
	},
});

popupClassEditProfiles.setEventListeners();

//Редактирование, сохранение и закрытие попап редактирования профиля
const submitEdit = () => {
	profileName.textContent = `${popupProfileName.value}`;
	profileAbout.textContent = `${popupProfileAbout.value}`;
};

profileAddButton.addEventListener("click", () => {
	//открытие попап добавления карточки
	cardFormValid.resetValidation();
	popupClassAddCard.openPopup();
});

// function fillImagePopup(valueLink, valueName) {
// 	//отправка атрибутов картинки
// 	openPopup(popupImg);
// 	popupImgImg.src = valueLink;
// 	popupImgImg.alt = valueName;
// 	popupImgTitle.textContent = valueName;
// }

function createCard(item) {
	const cardClass = new Card(
		{
			item,
			handleCardClick: (link, name) => {
				handleClick.openPopup(link, name);
			},
		},
		"#AddNewCard-template"
	);
	return cardClass.generateCard();
}

// initialCards.forEach((item) => {

// 	//выгружаем каждый элемент масива
// 	cards.append(createCard(item));
// });

// popupNewCardForm.addEventListener("submit", (event) => {
// 	//добавка новой карты
// 	event.preventDefault();
// 	const item = {
// 		name: popupInputTitle.value,
// 		alt: popupInputTitle.value,
// 		link: popupInputLink.value,
// 	};
// 	cards.prepend(createCard(item));
// 	event.target.reset();
// 	popupClassAddCard.closePopup();
// });

const popupClassAddCard = new PopupWithForm(".popup-add", {
	handleFormSubmit: () => {
		submitAdd();
	},
});

popupClassAddCard.setEventListeners();

const submitAdd = () => {
	//добавка новой карты
	const item = {
		name: popupInputTitle.value,
		alt: popupInputTitle.value,
		link: popupInputLink.value,
	};
	cards.prepend(createCard(item));
};

const carlList = new Section(
	{
		data: initialCards,
		renderer: (item) => {
			const cardElement = createCard(item);
			carlList.addItem(cardElement);
		},
	},
	".cards"
);
carlList.rendererCard();

const handleClick = new PopupWithImage(".popup-img");
handleClick.setEventListeners();

const profileFormValid = new FormValidator(validSettings, popupProfileForm);
profileFormValid.enableValid();

const cardFormValid = new FormValidator(validSettings, popupNewCardForm);
cardFormValid.enableValid();
