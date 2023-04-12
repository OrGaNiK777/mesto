class Api {
	constructor(options) {
		// тело конструктора
		this._url = options.url;
		this._headers = options.headers;
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
			headers: this._headers,
		}).then(this._checkingResponse);
	}

	//карты из сервера
	getInitialCards() {
		return fetch(`${this._url}cards`, {
			headers: this._headers,
		}).then(this._checkingResponse);
	}

	//обновление данных и пользователе
	patchUserInfo(data) {
		return fetch(`${this._url}users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then(this._checkingResponse);
	}

	//post добавление новой карты
	postDataCards(data) {
		return fetch(`${this._url}cards/`, {
			method: "post",
			headers: this._headers,
			body: JSON.stringify({
				link: data.link,
				name: data.name,
			}),
		}).then(this._checkingResponse);
	}

	//Удаление карточки
	deleteCard(id) {
		return fetch(`${this._url}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkingResponse);
	}

	//Постановка лайка
	putLike(id) {
		return fetch(`${this._url}/cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then(this._checkingResponse);
	}

	//снятие лайка
	deleteLike(id) {
		return fetch(`${this._url}/cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkingResponse);
	}

	//Обновление аватара пользователя
	updateAvatar(avatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar,
			}),
		}).then(this._checkingResponse);
	}
}

const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-63/",
	headers: { authorization: "17275e88-ca40-4ac8-86a3-d9ab7c8e3960", "Content-Type": "application/json" },
});

export default api;
