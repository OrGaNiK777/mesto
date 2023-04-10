class Api {
	constructor(options) {
		// тело конструктора
		this._url = options.url;
		this._token = options.token;
	}

	// обработка результата ответа сервера
	_checkingResponse(res) {
		if (res.ok) {
			return res.json();
		}
		// если ошибка, отклоняем промис
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	//данные о пользователе
	getUserInfo() {
		return fetch(`${this._url}users/me`, {
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkingResponse);
	}

	//карты из сервера
	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkingResponse);
	}

	//обновление данных и пользователе
	patchUserInfo(data) {
		return fetch(`${this._url}users/me`, {
			method: "PATCH",
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then(this._checkingResponse);
	}

	//добавление новой карты
	postDataCards(data) {
		return fetch(`${this._url}cards/`, {
			method: "post",
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				link: data.link,
				name: data.name,
			}),
		}).then(this._checkingResponse);
	}

	//Удаление карточки
	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: "DELETE",
			headers: { authorization: `${this._token}` },
		}).then(this._checkingResponse);
	}

	//Постановка лайка
	putLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "PUT",
			headers: { authorization: `${this._token}` },
		}).then(this._checkingResponse);
	}

	//снятие лайка
	deleteLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: { authorization: `${this._token}` },
		}).then(this._checkingResponse);
	}

	//Обновление аватара пользователя
	updateAvatar(avatar) {
		return fetch(`${this.this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: { authorization: `${this._token}` },
			body: JSON.stringify({
				avatar: avatar,
			}),
		}).then(this._checkingResponse);
	}
}

const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-63/",
	token: "17275e88-ca40-4ac8-86a3-d9ab7c8e3960",
});

export default api;
