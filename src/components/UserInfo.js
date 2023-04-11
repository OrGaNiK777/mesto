export default class UserInfo {
	constructor({ name, about, avatar }) {
		this._name = name;
		this._about = about;
		this._avatar = avatar;
	}
	getUserInfo() {
		return {
			name: this._name.textContent,
			about: this._about.textContent,
			id: this._id,
		};
	}
	setUserInfo({ name, about }) {
		this._name.textContent = name;
		this._about.textContent = about;
	}
	setUserAvatar(avatar) {
		this._avatar.src = avatar;
	}
	setUserId(id) {
		this._id = id;
	}
}
