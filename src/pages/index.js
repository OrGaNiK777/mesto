import "./index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "../utils/initial_cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validSettings } from "../utils/validSettings.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupProfileName = document.querySelector("#popupProfileName"); //имя - попап изменить профиль
const popupProfileAbout = document.querySelector("#popupProfileAbout"); //о - попап изменить профиль
const popupProfileForm = document.querySelector("#popupProfileForm");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку

const popupNewCardForm = document.querySelector("#popupNewCardForm");

const userInform = new UserInfo({ name: profileName, about: profileAbout });

const openPopupEditProfile = () => {
	//открытие попап редактирования профиля
	popupClassEditProfiles.openPopup();
	const { name, about } = userInform.getUserInfo();
	popupProfileName.value = name;
	popupProfileAbout.value = about;
	profileFormValid.resetValidation();
};

profileEditButton.addEventListener("click", openPopupEditProfile);

const popupClassEditProfiles = new PopupWithForm(".popup-profile", {
	handleFormSubmit: () => {
		submitEdit();
	},
});

popupClassEditProfiles.setEventListeners();

//Редактирование, сохранение и закрытие попап редактирования профиля
const submitEdit = () => {
	userInform.setUserInfo({ name: popupProfileName.value, about: popupProfileAbout.value });
	popupClassEditProfiles.closePopup();
};

const openPopupAddCard = () => {
	//открытие попап добавления карточки
	cardFormValid.resetValidation();
	popupClassAddCard.openPopup();
};

profileAddButton.addEventListener("click", openPopupAddCard);

function createCard(item) {
	const cardClass = new Card(
		{
			item,
			handleCardClick: (link, name) => {
				handleClickImg.openPopup(link, name);
			},
		},
		"#AddNewCard-template"
	);
	return cardClass.generateCard();
}

const popupClassAddCard = new PopupWithForm(".popup-add", {
	handleFormSubmit: (inputs) => {
		submitAdd(inputs);
	},
});

popupClassAddCard.setEventListeners();

const submitAdd = (inputs) => {
	//добавка новой карты
	const item = {
		name: inputs.title,
		alt: inputs.alt,
		link: inputs.link,
	};
	carlList.addItemPrepend(createCard(item));
	popupClassAddCard.closePopup();
};

const carlList = new Section(
	{
		renderer: (item) => {
			carlList.addItemAppend(createCard(item));
		},
	},
	".cards"
);
carlList.rendererCard(initialCards);

const handleClickImg = new PopupWithImage(".popup-img");
handleClickImg.setEventListeners();

const profileFormValid = new FormValidator(validSettings, popupProfileForm);
profileFormValid.enableValid();

const cardFormValid = new FormValidator(validSettings, popupNewCardForm);
cardFormValid.enableValid();
