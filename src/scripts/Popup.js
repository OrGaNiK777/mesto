export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = document.querySelector(popupSelector);
		this._closeButton = this._popupSelector.querySelector(".popup__button-close");
		this._closeByEsc = this._closeByEsc.bind(this);
	}

	openPopup() {
		//добавление класса popup_opened
		this._popupSelector.classList.add("popup_opened");
		document.addEventListener("keydown", this._closeByEsc);
	}

	closePopup() {
		//удаление класса popup_opened
		this._popupSelector.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._closeByEsc);
	}

	_closeByEsc(event) {
		//закрывает модальное окно при нажатии Esc
		if (event.key === "Escape") {
			this.closePopup();
		}
	}

	setEventListeners() {
		this._closeButton.addEventListener("mousedown", () => {
			this.closePopup();
		});
		this._popupSelector.addEventListener("mousedown", (event) => {
			if (event.target === event.currentTarget) {
				this.closePopup(event.currentTarget);
			}
		});
	}
}
