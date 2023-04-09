class Api {
	constructor(options) {
		// тело конструктора
		this._url = options.url;
		this._token = options.token;
	}
	_checkingResponse(res) {
		if (res.ok) {
			return res.json();
		}
		// если ошибка, отклоняем промис
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkingResponse);
	}

	getInitialCards() {
		return fetch(`${this._url}/cards/`, {
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkingResponse);
	}

	patchUserInfo(data) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		});
	}

	postDataCards(data) {
		return fetch(`${this._url}/cards/`, {
			method: "POST",
			headers: {
				authorization: `${this._token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: data.title,
				link: data.link,
			}),
		});
	}
}

const api = new Api({
	url: "https://mesto.nomoreparties.co/v1/cohort-63",
	token: "17275e88-ca40-4ac8-86a3-d9ab7c8e3960",
});

export default api;
