export default class Popup {
	constructor(popup) {
		this._popup = document.querySelector(popup);
		this._closeByEsc = this._closeByEsc.bind(this);
		this._popupOpened = "popup_opened";
	}

	openPopup() {
		//добавление класса popup_opened
		this._popup.classList.add(this._popupOpened);
		document.addEventListener("keydown", this._closeByEsc);
	}

	closePopup() {
		//удаление класса popup_opened
		this._popup.classList.remove(this._popupOpened);
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
		this._popup.addEventListener("mousedown", (evt) => {
			if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")) {
				this.closePopup();
			}
		});
	}
}
