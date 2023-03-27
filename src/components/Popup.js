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
		//закрытие по клику на оверлэй используя contains
		this._popupSelector.addEventListener("mousedown", (evt) => {
			if (
				evt.target.classList.contains("popup") ||
				evt.target.classList.contains("popup__button-close")
			) {
				this.closePopup();
			}
		});
	}
}
