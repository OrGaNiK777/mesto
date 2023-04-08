(() => {
	"use strict";
	function t(e) {
		return (
			(t =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			t(e)
		);
	}
	function e(e, r) {
		for (var n = 0; n < r.length; n++) {
			var o = r[n];
			(o.enumerable = o.enumerable || !1),
				(o.configurable = !0),
				"value" in o && (o.writable = !0),
				Object.defineProperty(
					e,
					(void 0,
					(i = (function (e, r) {
						if ("object" !== t(e) || null === e) return e;
						var n = e[Symbol.toPrimitive];
						if (void 0 !== n) {
							var o = n.call(e, "string");
							if ("object" !== t(o)) return o;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return String(e);
					})(o.key)),
					"symbol" === t(i) ? i : String(i)),
					o
				);
		}
		var i;
	}
	var r = (function () {
		function t(e, r) {
			var n = e.item,
				o = e.handleCardClick;
			!(function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this._name = n.name),
				(this._link = n.link),
				(this._templateSelector = r),
				(this._handleCardClick = o);
		}
		var r, n;
		return (
			(r = t),
			(n = [
				{
					key: "_getTemplate",
					value: function () {
						return document
							.querySelector(this._templateSelector)
							.content.querySelector(".card")
							.cloneNode(!0);
					},
				},
				{
					key: "generateCard",
					value: function () {
						this._card = this._getTemplate();
						var t = this._card.querySelector(".card__title"),
							e = this._card.querySelector(".card__image");
						return (
							this._setEventListeners(),
							(t.textContent = this._name),
							(e.src = this._link),
							(e.alt = this._name),
							this._card
						);
					},
				},
				{
					key: "_setEventListeners",
					value: function () {
						var t = this;
						(this._cardImage = this._card.querySelector(".card__image")),
							(this._likeButton = this._card.querySelector(".card__icon-like")),
							(this._deleteButton = this._card.querySelector(".card__icon-delete")),
							this._likeButton.addEventListener("click", function () {
								t._toggleLike();
							}),
							this._deleteButton.addEventListener("click", function () {
								t._removeCard();
							}),
							this._cardImage.addEventListener("click", function () {
								t._handleCardClick(t._link, t._name);
							});
					},
				},
				{
					key: "_toggleLike",
					value: function () {
						this._likeButton.classList.toggle("card__icon-like_active");
					},
				},
				{
					key: "_removeCard",
					value: function () {
						this._card.remove(), (this._card = null);
					},
				},
			]) && e(r.prototype, n),
			Object.defineProperty(r, "prototype", { writable: !1 }),
			t
		);
	})();
	function n(t) {
		return (
			(n =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			n(t)
		);
	}
	function o(t, e) {
		for (var r = 0; r < e.length; r++) {
			var o = e[r];
			(o.enumerable = o.enumerable || !1),
				(o.configurable = !0),
				"value" in o && (o.writable = !0),
				Object.defineProperty(
					t,
					(void 0,
					(i = (function (t, e) {
						if ("object" !== n(t) || null === t) return t;
						var r = t[Symbol.toPrimitive];
						if (void 0 !== r) {
							var o = r.call(t, "string");
							if ("object" !== n(o)) return o;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return String(t);
					})(o.key)),
					"symbol" === n(i) ? i : String(i)),
					o
				);
		}
		var i;
	}
	var i = (function () {
			function t(e, r) {
				!(function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
				})(this, t),
					(this._validSettings = e),
					(this._formElement = r);
			}
			var e, r;
			return (
				(e = t),
				(r = [
					{
						key: "_errorShow",
						value: function (t, e) {
							var r = this._formElement.querySelector(".".concat(t.id, "-error"));
							t.classList.add(this._validSettings.errorClass),
								r.classList.add(this._validSettings.inputErrorClass),
								(r.textContent = e);
						},
					},
					{
						key: "_errorHide",
						value: function (t) {
							var e = this._formElement.querySelector(".".concat(t.id, "-error"));
							t.classList.remove(this._validSettings.errorClass),
								e.classList.remove(this._validSettings.inputErrorClass),
								e.reset;
						},
					},
					{
						key: "_checkValid",
						value: function (t) {
							t.validity.valid
								? this._errorHide(t)
								: this._errorShow(t, t.validationMessage);
						},
					},
					{
						key: "_setEventListeners",
						value: function () {
							var t = this;
							(this._inputList = Array.from(
								this._formElement.querySelectorAll(
									this._validSettings.inputSelector
								)
							)),
								(this._buttonElement = this._formElement.querySelector(
									this._validSettings.submitButtonSelector
								)),
								this.toggleButtonState(),
								this._inputList.forEach(function (e) {
									e.addEventListener("input", function () {
										t._checkValid(e), t.toggleButtonState();
									});
								});
						},
					},
					{
						key: "_hasInvalid",
						value: function () {
							return this._inputList.some(function (t) {
								return !t.validity.valid;
							});
						},
					},
					{
						key: "toggleButtonState",
						value: function () {
							this._hasInvalid()
								? (this._buttonElement.setAttribute("disabled", !0),
								  this._buttonElement.classList.add(
										this._validSettings.inactiveButtonClass
								  ))
								: (this._buttonElement.removeAttribute("disabled"),
								  this._buttonElement.classList.remove(
										this._validSettings.inactiveButtonClass
								  )),
								this._buttonElement.setAttribute.reset;
						},
					},
					{
						key: "enableValid",
						value: function () {
							this._setEventListeners();
						},
					},
					{
						key: "resetValidation",
						value: function () {
							var t = this;
							this.toggleButtonState(),
								this._inputList.forEach(function (e) {
									t._errorHide(e);
								});
						},
					},
				]) && o(e.prototype, r),
				Object.defineProperty(e, "prototype", { writable: !1 }),
				t
			);
		})(),
		u = {
			formSelector: ".popup__form",
			inputSelector: ".popup__input",
			submitButtonSelector: ".popup__button-save",
			inactiveButtonClass: "popup__button-save_inactive",
			inputErrorClass: "popup__input-error_active",
			errorClass: "popup__input_disabled",
		};
	function a(t) {
		return (
			(a =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			a(t)
		);
	}
	function c(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				"value" in n && (n.writable = !0),
				Object.defineProperty(t, l(n.key), n);
		}
	}
	function l(t) {
		var e = (function (t, e) {
			if ("object" !== a(t) || null === t) return t;
			var r = t[Symbol.toPrimitive];
			if (void 0 !== r) {
				var n = r.call(t, "string");
				if ("object" !== a(n)) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(t);
		})(t);
		return "symbol" === a(e) ? e : String(e);
	}
	var s = (function () {
		function t(e, r) {
			var n,
				o,
				i,
				u = this,
				a = e.renderer;
			!(function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(n = this),
				(i = function (t) {
					u._container.prepend(t);
				}),
				(o = l((o = "addItemPrepend"))) in n
					? Object.defineProperty(n, o, {
							value: i,
							enumerable: !0,
							configurable: !0,
							writable: !0,
					  })
					: (n[o] = i),
				(this._renderer = a),
				(this._container = document.querySelector(r));
		}
		var e, r;
		return (
			(e = t),
			(r = [
				{
					key: "rendererCard",
					value: function (t) {
						var e = this;
						t.forEach(function (t) {
							e._renderer(t);
						});
					},
				},
				{
					key: "addItemAppend",
					value: function (t) {
						this._container.append(t);
					},
				},
			]) && c(e.prototype, r),
			Object.defineProperty(e, "prototype", { writable: !1 }),
			t
		);
	})();
	function p(t) {
		return (
			(p =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			p(t)
		);
	}
	function f(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				"value" in n && (n.writable = !0),
				Object.defineProperty(
					t,
					(void 0,
					(o = (function (t, e) {
						if ("object" !== p(t) || null === t) return t;
						var r = t[Symbol.toPrimitive];
						if (void 0 !== r) {
							var n = r.call(t, "string");
							if ("object" !== p(n)) return n;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return String(t);
					})(n.key)),
					"symbol" === p(o) ? o : String(o)),
					n
				);
		}
		var o;
	}
	var y = (function () {
		function t(e) {
			!(function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
			})(this, t),
				(this._popupSelector = document.querySelector(e)),
				(this._closeButton = this._popupSelector.querySelector(".popup__button-close")),
				(this._closeByEsc = this._closeByEsc.bind(this));
		}
		var e, r;
		return (
			(e = t),
			(r = [
				{
					key: "openPopup",
					value: function () {
						this._popupSelector.classList.add("popup_opened"),
							document.addEventListener("keydown", this._closeByEsc);
					},
				},
				{
					key: "closePopup",
					value: function () {
						this._popupSelector.classList.remove("popup_opened"),
							document.removeEventListener("keydown", this._closeByEsc);
					},
				},
				{
					key: "_closeByEsc",
					value: function (t) {
						"Escape" === t.key && this.closePopup();
					},
				},
				{
					key: "setEventListeners",
					value: function () {
						var t = this;
						this._popupSelector.addEventListener("mousedown", function (e) {
							(e.target.classList.contains("popup") ||
								e.target.classList.contains("popup__button-close")) &&
								t.closePopup();
						});
					},
				},
			]) && f(e.prototype, r),
			Object.defineProperty(e, "prototype", { writable: !1 }),
			t
		);
	})();
	function d(t) {
		return (
			(d =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			d(t)
		);
	}
	function m(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				"value" in n && (n.writable = !0),
				Object.defineProperty(
					t,
					(void 0,
					(o = (function (t, e) {
						if ("object" !== d(t) || null === t) return t;
						var r = t[Symbol.toPrimitive];
						if (void 0 !== r) {
							var n = r.call(t, "string");
							if ("object" !== d(n)) return n;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return String(t);
					})(n.key)),
					"symbol" === d(o) ? o : String(o)),
					n
				);
		}
		var o;
	}
	function v() {
		return (
			(v =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (t, e, r) {
							var n = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = h(t));

								);
								return t;
							})(t, e);
							if (n) {
								var o = Object.getOwnPropertyDescriptor(n, e);
								return o.get ? o.get.call(arguments.length < 3 ? t : r) : o.value;
							}
					  }),
			v.apply(this, arguments)
		);
	}
	function b(t, e) {
		return (
			(b = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (t, e) {
						return (t.__proto__ = e), t;
				  }),
			b(t, e)
		);
	}
	function h(t) {
		return (
			(h = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
				  }),
			h(t)
		);
	}
	var _ = (function (t) {
		!(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: { value: t, writable: !0, configurable: !0 },
			})),
				Object.defineProperty(t, "prototype", { writable: !1 }),
				e && b(t, e);
		})(u, t);
		var e,
			r,
			n,
			o,
			i =
				((n = u),
				(o = (function () {
					if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
					if (Reflect.construct.sham) return !1;
					if ("function" == typeof Proxy) return !0;
					try {
						return (
							Boolean.prototype.valueOf.call(
								Reflect.construct(Boolean, [], function () {})
							),
							!0
						);
					} catch (t) {
						return !1;
					}
				})()),
				function () {
					var t,
						e = h(n);
					if (o) {
						var r = h(this).constructor;
						t = Reflect.construct(e, arguments, r);
					} else t = e.apply(this, arguments);
					return (function (t, e) {
						if (e && ("object" === d(e) || "function" == typeof e)) return e;
						if (void 0 !== e)
							throw new TypeError(
								"Derived constructors may only return object or undefined"
							);
						return (function (t) {
							if (void 0 === t)
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							return t;
						})(t);
					})(this, t);
				});
		function u(t) {
			var e;
			return (
				(function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
				})(this, u),
				((e = i.call(this, t))._popupSelector = document.querySelector(t)),
				(e._popupImg = e._popupSelector.querySelector(".popup-img__img")),
				(e._popupTitle = e._popupSelector.querySelector(".popup-img__title")),
				e
			);
		}
		return (
			(e = u),
			(r = [
				{
					key: "openPopup",
					value: function (t, e) {
						v(h(u.prototype), "openPopup", this).call(this),
							(this._popupImg.src = t),
							(this._popupImg.alt = e),
							(this._popupTitle.textContent = e);
					},
				},
			]) && m(e.prototype, r),
			Object.defineProperty(e, "prototype", { writable: !1 }),
			u
		);
	})(y);
	function S(t) {
		return (
			(S =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			S(t)
		);
	}
	function g(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				"value" in n && (n.writable = !0),
				Object.defineProperty(t, j(n.key), n);
		}
	}
	function w() {
		return (
			(w =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get.bind()
					: function (t, e, r) {
							var n = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = E(t));

								);
								return t;
							})(t, e);
							if (n) {
								var o = Object.getOwnPropertyDescriptor(n, e);
								return o.get ? o.get.call(arguments.length < 3 ? t : r) : o.value;
							}
					  }),
			w.apply(this, arguments)
		);
	}
	function k(t, e) {
		return (
			(k = Object.setPrototypeOf
				? Object.setPrototypeOf.bind()
				: function (t, e) {
						return (t.__proto__ = e), t;
				  }),
			k(t, e)
		);
	}
	function P(t) {
		if (void 0 === t)
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t;
	}
	function E(t) {
		return (
			(E = Object.setPrototypeOf
				? Object.getPrototypeOf.bind()
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
				  }),
			E(t)
		);
	}
	function j(t) {
		var e = (function (t, e) {
			if ("object" !== S(t) || null === t) return t;
			var r = t[Symbol.toPrimitive];
			if (void 0 !== r) {
				var n = r.call(t, "string");
				if ("object" !== S(n)) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return String(t);
		})(t);
		return "symbol" === S(e) ? e : String(e);
	}
	var O = (function (t) {
		!(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: { value: t, writable: !0, configurable: !0 },
			})),
				Object.defineProperty(t, "prototype", { writable: !1 }),
				e && k(t, e);
		})(u, t);
		var e,
			r,
			n,
			o,
			i =
				((n = u),
				(o = (function () {
					if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
					if (Reflect.construct.sham) return !1;
					if ("function" == typeof Proxy) return !0;
					try {
						return (
							Boolean.prototype.valueOf.call(
								Reflect.construct(Boolean, [], function () {})
							),
							!0
						);
					} catch (t) {
						return !1;
					}
				})()),
				function () {
					var t,
						e = E(n);
					if (o) {
						var r = E(this).constructor;
						t = Reflect.construct(e, arguments, r);
					} else t = e.apply(this, arguments);
					return (function (t, e) {
						if (e && ("object" === S(e) || "function" == typeof e)) return e;
						if (void 0 !== e)
							throw new TypeError(
								"Derived constructors may only return object or undefined"
							);
						return P(t);
					})(this, t);
				});
		function u(t, e) {
			var r,
				n,
				o,
				a,
				c = e.handleFormSubmit;
			return (
				(function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
				})(this, u),
				(n = P((r = i.call(this, t)))),
				(a = function (t) {
					t.preventDefault(), r._handleFormSubmit(r._getInputValues());
				}),
				(o = j((o = "_onSubmit"))) in n
					? Object.defineProperty(n, o, {
							value: a,
							enumerable: !0,
							configurable: !0,
							writable: !0,
					  })
					: (n[o] = a),
				(r._handleFormSubmit = c),
				(r._form = r._popupSelector.querySelector(".popup__form")),
				(r._inputList = r._form.querySelectorAll(".popup__input")),
				r
			);
		}
		return (
			(e = u),
			(r = [
				{
					key: "_getInputValues",
					value: function () {
						var t = this;
						return (
							(this._formValues = {}),
							this._inputList.forEach(function (e) {
								t._formValues[e.name] = e.value;
							}),
							this._formValues
						);
					},
				},
				{
					key: "closePopup",
					value: function () {
						w(E(u.prototype), "closePopup", this).call(this), this._form.reset();
					},
				},
				{
					key: "setEventListeners",
					value: function () {
						this._form.addEventListener("submit", this._onSubmit),
							w(E(u.prototype), "setEventListeners", this).call(this);
					},
				},
			]) && g(e.prototype, r),
			Object.defineProperty(e, "prototype", { writable: !1 }),
			u
		);
	})(y);
	function C(t) {
		return (
			(C =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  }),
			C(t)
		);
	}
	function L(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				"value" in n && (n.writable = !0),
				Object.defineProperty(
					t,
					(void 0,
					(o = (function (t, e) {
						if ("object" !== C(t) || null === t) return t;
						var r = t[Symbol.toPrimitive];
						if (void 0 !== r) {
							var n = r.call(t, "string");
							if ("object" !== C(n)) return n;
							throw new TypeError("@@toPrimitive must return a primitive value.");
						}
						return String(t);
					})(n.key)),
					"symbol" === C(o) ? o : String(o)),
					n
				);
		}
		var o;
	}
	var q = (function () {
			function t(e) {
				var r = e.name,
					n = e.about;
				!(function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
				})(this, t),
					(this._name = r),
					(this._about = n);
			}
			var e, r;
			return (
				(e = t),
				(r = [
					{
						key: "getUserInfo",
						value: function () {
							return { name: this._name.textContent, about: this._about.textContent };
						},
					},
					{
						key: "setUserInfo",
						value: function (t) {
							var e = t.name,
								r = t.about;
							(this._name.textContent = e), (this._about.textContent = r);
						},
					},
				]) && L(e.prototype, r),
				Object.defineProperty(e, "prototype", { writable: !1 }),
				t
			);
		})(),
		B = document.querySelector("#popupProfileName"),
		T = document.querySelector("#popupProfileAbout"),
		R = document.querySelector("#popupProfileForm"),
		x = document.querySelector(".profile__name"),
		I = document.querySelector(".profile__about"),
		V = document.querySelector(".profile__edit-button"),
		A = document.querySelector(".profile__add-button"),
		F = document.querySelector("#popupNewCardForm"),
		D = new q({ name: x, about: I });
	V.addEventListener("click", function () {
		N.openPopup();
		var t = D.getUserInfo(),
			e = t.name,
			r = t.about;
		(B.value = e), (T.value = r), K.resetValidation();
	});
	var N = new O(".popup-profile", {
		handleFormSubmit: function (t) {
			U(t);
		},
	});
	N.setEventListeners();
	var U = function (t) {
		var e = { name: t.name, about: t.about };
		D.setUserInfo(e), N.closePopup();
	};
	function H(t) {
		return new r(
			{
				item: t,
				handleCardClick: function (t, e) {
					J.openPopup(t, e);
				},
			},
			"#AddNewCard-template"
		).generateCard();
	}
	A.addEventListener("click", function () {
		Q.resetValidation(), z.openPopup();
	});
	var z = new O(".popup-add", {
		handleFormSubmit: function (t) {
			M(t);
		},
	});
	z.setEventListeners();
	var M = function (t) {
			var e = { name: t.title, alt: t.alt, link: t.link };
			G.addItemPrepend(H(e)), z.closePopup();
		},
		G = new s(
			{
				renderer: function (t) {
					G.addItemAppend(H(t));
				},
			},
			".cards"
		);
	G.rendererCard([
		{
			name: "Архыз",
			link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
		},
		{
			name: "Челябинская область",
			link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
		},
		{
			name: "Иваново",
			link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
		},
		{
			name: "Камчатка",
			link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
		},
		{
			name: "Холмогорский район",
			link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
		},
		{
			name: "Байкал",
			link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
		},
	]);
	var J = new _(".popup-img");
	J.setEventListeners();
	var K = new i(u, R);
	K.enableValid();
	var Q = new i(u, F);
	Q.enableValid();
})();
