import "./index.css"; // добавьте импорт главного файла стилей
//import { initialCards } from "../utils/initial_cards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validSettings } from "../utils/validSettings.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";

const popupProfileName = document.querySelector("#popupProfileName"); //имя - попап изменить профиль
const popupProfileAbout = document.querySelector("#popupProfileAbout"); //о - попап изменить профиль
const popupProfileForm = document.querySelector("#popupProfileForm");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector(".profile__avatar");

const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку

const popupNewCardForm = document.querySelector("#popupNewCardForm");

const userInform = new UserInfo({ name: profileName, about: profileAbout, avatar: profileAvatar });

api.getUserInfo().then((data) => {
	const { name, about, avatar } = userInform.getUserInfo();
	(name = data.avatar), (about = data.name), (avatar = data.about);
});

// api.getUserInfo().then((data) => {
// 	(profileAvatar.src = data.avatar),
// 		(profileName.textContent = data.name),
// 		(profileAbout.textContent = data.about);

// });

const openPopupEditProfile = () => {
	//открытие попап редактирования профиля
	popupClassEditProfiles.openPopup();
	const { name, about } = userInform.getUserInfo();
	popupProfileName.value = name;
	console.log(name);
	popupProfileAbout.value = about;
	profileFormValid.resetValidation();
};

profileEditButton.addEventListener("click", openPopupEditProfile);

const popupClassEditProfiles = new PopupWithForm(".popup-profile", {
	handleFormSubmit: (inputs) => {
		submitEdit(inputs);
	},
});

popupClassEditProfiles.setEventListeners();

//Редактирование, сохранение и закрытие попап редактирования профиля
const submitEdit = (inputs) => {
	api.patchUserInfo(inputs);
	userInform.setUserInfo(inputs);
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
	//console.log(inputs)
	api.postDataCards(inputs);

	carlList.addItemPrepend(createCard(inputs));
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

//выгрузка карт с сервера

api.getInitialCards().then((data) => carlList.rendererCard(data));

const handleClickImg = new PopupWithImage(".popup-img");
handleClickImg.setEventListeners();

const profileFormValid = new FormValidator(validSettings, popupProfileForm);
profileFormValid.enableValid();

const cardFormValid = new FormValidator(validSettings, popupNewCardForm);
cardFormValid.enableValid();
