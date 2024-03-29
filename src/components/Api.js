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

	_request(url, options) {
		return fetch(url, options).then(this._checkingResponse);
	}

	//получение данных о пользователе
	getUserInfo() {
		return this._request(`${this._url}users/me`, {
			headers: this._headers,
		});
	}

	//выгрузка карт с сервера
	getInitialCards() {
		return this._request(`${this._url}cards`, {
			headers: this._headers,
		});
	}

	//обновление данных о пользователе
	patchUserInfo(data) {
		return this._request(`${this._url}users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		});
	}

	//отправка данных новой карты
	postDataCards(data) {
		return this._request(`${this._url}cards/`, {
			method: "post",
			headers: this._headers,
			body: JSON.stringify({
				link: data.link,
				name: data.name,
			}),
		});
	}

	//Удаление карточки
	deleteCard(id) {
		return this._request(`${this._url}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers,
		});
	}

	//лайк
	putLike(id) {
		return this._request(`${this._url}/cards/${id}/likes`, {
			method: "PUT",
			headers: this._headers,
		});
	}

	//удаление лайка
	deleteLike(id) {
		return this._request(`${this._url}/cards/${id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		});
	}

	//Обновление аватара пользователя
	updateAvatar(avatar) {
		return this._request(`${this._url}users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar: avatar,
			}),
		});
	}
}

const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-63/",
	headers: { authorization: "17275e88-ca40-4ac8-86a3-d9ab7c8e3960", "Content-Type": "application/json" },
});

export default api;
