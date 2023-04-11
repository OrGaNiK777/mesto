import "./index.css"; // добавьте импорт главного файла стилей
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { validSettings } from "../utils/validSettings.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
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

const thisOwner = (idData) => {
	return idData.owner._id === userInform.getUserInfo().id ? true : false;
};

// api.getUserInfo()
// 	.then((data) => {
// 		const { name, about, avatar } = userInform.getUserInfo();
// 		name = data.name;
// 		about = data.about;
// 		avatar = data.avatar;
// 		console.log(name);
// 	}); // что-то не получилось с помощью userInform.getUserInfo() настроить

api.getUserInfo().then((data) => {
	(profileAvatar.src = data.avatar), (profileName.textContent = data.name), (profileAbout.textContent = data.about);
});
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
	handleFormSubmit: (inputs) => {
		submitEdit(inputs);
	},
});

popupClassEditProfiles.setEventListeners();

//Редактирование, сохранение и закрытие попап редактирования профиля
const submitEdit = (inputs) => {
	api.patchUserInfo(inputs).then((data) => userInform.setUserInfo(data));
	popupClassEditProfiles.closePopup();
};

const openPopupAddCard = () => {
	//открытие попап добавления карточки
	cardFormValid.resetValidation();
	popupClassAddCard.openPopup();
};

profileAddButton.addEventListener("click", openPopupAddCard);

function createCard(item, thisOwner) {
	const cardClass = new Card(
		item,
		thisOwner,
		{
			handleCardClick: (link, name) => {
				handleClickImg.openPopup(link, name);
			},
			handleDeleteCard: (item) => {
				popupDeleteCard.openPopup({
					handleSubmit: () => {
						api.deleteCard(item).then(() => {
							cardClass.delete();
						});
					},
				});
			},
			handleDeleteLike: () => {
				api.deleteLike(item._id)
					.then((data) => {
						cardClass.toggleLike();
						cardClass.updateNumberLikes(data.likes.length);
					})
					.catch((error) => {
						console.log(error.message);
					});
			},
			handleAddLike: () => {
				api.putLike(item._id)
					.then((data) => {
						//cardClass.toggleLike();
						cardClass.updateNumberLikes(data.likes.length);
					})
					.catch((error) => {
						console.log(error.message);
					});
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
	api.postDataCards({ name: inputs.name, link: inputs.link }).then((data) => {
		cardList.addItemPrepend(createCard(data));
	});

	popupClassAddCard.closePopup();
};

const cardList = new Section(
	{
		renderer: (item) => {
			cardList.addItemAppend(createCard(item, thisOwner(item)));
		},
	},
	".cards"
);

api.getInitialCards().then((data) => cardList.rendererCard(data));

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([data, cardListData]) => {
		userInform.setUserInfo(data.name, data.about);
		userInform.setUserAvatar(data.avatar);
		userInform.setUserId(data._id);
		cardList.rendererCard(cardListData);
	})
	.catch((error) => {
		console.log(error.message);
	});

const popupDeleteCard = new PopupDeleteCard(".popup-delete");
popupDeleteCard.setEventListeners();

const handleClickImg = new PopupWithImage(".popup-img");
handleClickImg.setEventListeners();

const profileFormValid = new FormValidator(validSettings, popupProfileForm);
profileFormValid.enableValid();

const cardFormValid = new FormValidator(validSettings, popupNewCardForm);
cardFormValid.enableValid();
