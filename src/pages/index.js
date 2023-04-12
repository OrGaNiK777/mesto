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

const popupAvatarForm = document.querySelector("#popupAvatarForm");
const profileAvatarEdit = document.querySelector(".profile__avatar-edit");

const userInform = new UserInfo({ name: profileName, about: profileAbout, avatar: profileAvatar });

const thisOwner = (idData) => {
	return idData.owner._id === userInform.getUserInfo().id ? true : false;
};

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
	popupClassEditProfiles.renderLoading("Сохранение...");
	api.patchUserInfo(inputs)
		.then((data) => {
			userInform.setUserInfo(data);
		})
		.catch((error) => {
			console.log(error.message);
		})
		.finally(() => {
			popupClassEditProfiles.closePopup();
			popupClassEditProfiles.renderLoading("Сохранить");
		});
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
						popupDeleteCard.renderLoading("Удаление...");
						api.deleteCard(item)
							.then(() => {
								cardClass.removeCard();
							})
							.catch((error) => {
								console.log(error.message);
							})
							.finally(() => {
								popupDeleteCard.closePopup();
								popupDeleteCard.renderLoading("Удалено");
							});
					},
				});
			},
			handleDeleteLike: () => {
				api.deleteLike(item._id)
					.then((item) => {
						cardClass.toggleLike();
						cardClass.updateNumberLikes(item.likes.length);
					})
					.catch((error) => {
						console.log(error.message);
					});
			},
			handleAddLike: () => {
				api.putLike(item._id)
					.then((item) => {
						cardClass.toggleLike();
						cardClass.updateNumberLikes(item.likes.length);
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

//добавка новой карты
const submitAdd = (inputs) => {
	popupClassAddCard.renderLoading("Создание...");
	api.postDataCards({ name: inputs.name, link: inputs.link })
		.then((data) => {
			cardList.addItemPrepend(createCard(data));
			popupClassAddCard.closePopup();
		})
		.catch((error) => {
			console.log(error.message);
		})
		.finally(() => {
			popupClassAddCard.renderLoading("Создать");
		});
};

const cardList = new Section(
	{
		renderer: (item) => {
			cardList.addItemAppend(createCard(item, thisOwner(item)));
		},
	},
	".cards"
);

profileAvatarEdit.addEventListener("click", () => {
	popupClassAvatar.openPopup();
	avatarFormValid.resetValidation();
});

//обработчик изменения аватара
const popupClassAvatar = new PopupWithForm(".popup-avatar", {
	handleFormSubmit: (inputs) => {
		submitAvatar(inputs);
	},
});

popupClassAvatar.setEventListeners();

const submitAvatar = (inputs) => {
	popupClassAvatar.renderLoading("Сохранение...");
	api.updateAvatar(inputs)
		.then((data) => {
			userInform.setUserAvatar(data.avatar);
		})
		.catch((error) => {
			console.log(error.message);
		})
		.finally(() => {
			popupClassAvatar.closePopup();
			popupClassAvatar.renderLoading("Сохранить");
		});
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([data, cardListData]) => {
		userInform.setUserInfo({ name: data.name, about: data.about });
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

const avatarFormValid = new FormValidator(validSettings, popupAvatarForm);
avatarFormValid.enableValid();
