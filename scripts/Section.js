export default class Section {
	constructor({ data, renderer }, containerSelector) {
		this._item = data;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}
	rendererCard() {
		this._item.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(element) {
		this._container.append(element);
	}
}
