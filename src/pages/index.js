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
const popupProfileForm = document.forms["profileForm"];

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector(".profile__avatar");

const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка изменить профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку

const popupNewCardForm = document.forms["cardForm"];

const popupAvatarForm = document.forms["avatarForm"];
const profileAvatarEdit = document.querySelector(".profile__avatar-edit");

//выяснение пользователя
const isOwner = (idData) => {
	return idData === userInform.getUserInfo().id ? true : false;
};

const userInform = new UserInfo({ name: profileName, about: profileAbout, avatar: profileAvatar });

//открытие и валидация попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
	popupClassEditProfiles.openPopup();
	const { name, about } = userInform.getUserInfo();
	popupClassEditProfiles.setInputValues({ name, about });
	profileFormValid.resetValidation();
});

const popupClassEditProfiles = new PopupWithForm(".popup-profile", {
	handleFormSubmit: (inputs) => {
		submitEdit(inputs);
	},
});

popupClassEditProfiles.setEventListeners();

//Редактирование профиля
const submitEdit = (inputs) => {
	popupClassEditProfiles.loading("Сохранение...");
	api.patchUserInfo(inputs)
		.then((data) => {
			userInform.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar, id: data._id });
			popupClassEditProfiles.closePopup();
		})
		.catch((error) => {
			console.log(error.message);
		})
		.finally(() => {
			popupClassEditProfiles.loading("Сохранить");
		});
};

//открытие и валидация попапа добавления карточки
profileAddButton.addEventListener("click", () => {
	cardFormValid.resetValidation();
	popupClassAddCard.openPopup();
});

//добавка новой карты
const popupClassAddCard = new PopupWithForm(".popup-add", {
	handleFormSubmit: (inputs) => {
		submitAdd(inputs);
	},
});

popupClassAddCard.setEventListeners();

//отправка новой карты
const submitAdd = (inputs) => {
	popupClassAddCard.loading("Создание...");
	api.postDataCards({ name: inputs.name, link: inputs.link })
		.then((data) => {
			cardList.addItemPrepend(createCard(data, true, false));
			popupClassAddCard.closePopup();
		})
		.catch((error) => {
			console.log(error.message);
		})
		.finally(() => {
			popupClassAddCard.loading("Создать");
		});
};

//открытие и валидация попапа изменения аватара
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

//отправка аватара
const submitAvatar = (inputs) => {
	popupClassAvatar.loading("Сохранение...");
	api.updateAvatar(inputs.link)
		.then((data) => {
			userInform.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar, id: data._id });
			popupClassAvatar.closePopup();
		})
		.catch((error) => {
			console.log(error.message);
		})
		.finally(() => {
			popupClassAvatar.loading("Сохранить");
		});
};

//создание листа карточек для отображения
const cardList = new Section(
	{
		renderer: (item) => {
			cardList.addItemAppend(createCard(item, isOwner(item.owner._id), userInform.getUserInfo().id));
		},
	},
	".cards"
);

//создание карты(со всеми бонусами)
function createCard(item, isOwner, idOwner) {
	const cardClass = new Card(
		item,
		isOwner,
		idOwner,
		{
			handleCardClick: (link, name) => {
				handleClickImg.openPopup(link, name);
			},
			handleDeleteCard: (item) => {
				popupDeleteCard.openPopup({
					handleSubmit: () => {
						popupDeleteCard.loading("Удаление...");
						api.deleteCard(item)
							.then(() => {
								cardClass.removeCard();
								popupDeleteCard.closePopup();
							})
							.catch((error) => {
								console.log(error.message);
							})
							.finally(() => {
								popupDeleteCard.loading("Удалить");
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([data, cardListData]) => {
		userInform.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar, id: data._id });
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
profileFormValid.enableValidation();

const cardFormValid = new FormValidator(validSettings, popupNewCardForm);
cardFormValid.enableValidation();

const avatarFormValid = new FormValidator(validSettings, popupAvatarForm);
avatarFormValid.enableValidation();
