// let popupName = document.querySelector('.popup__name')
// console.log(popupName);
let popup = document.querySelector(".popup");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupButtonSave = document.querySelector(".popup__button-save");
let popupButtonClose = document.querySelector(".popup__button-close");

function popupOpened() {
	popup.classList.add("popup__opened");
}
profileEditButton.addEventListener("click", popupOpened);

function popupClose() {
	popup.classList.remove("popup__opened");
}
popupButtonClose.addEventListener("click", popupClose);
popupButtonSave.addEventListener("click", popupClose);

// function addName() {
// 	let name = document.querySelector(".popup__name");
// 	let about = document.querySelector(".popup__about");

// 	songsContainer.insertAdjacentHTML(
// 		"beforeend",
// 		`<img
//             class="profile__avatar"
//             src="./images/avatar.jpg"
//             alt="Аватар"
//         />
//         <h1 class="profile__name">${name.value}</h1>
//         <p class="profile__about">${about.value}</p>
//         <button class="profile__edit-button"></button>
//         `);  
//         name.value = '';
//         about.value = '';
// }

// Находим форму в DOM
let profileInfo = document.querySelector('.profile__info')
// Находим поля формы в DOM
let name = document.querySelector(".popup__name");
let about = document.querySelector(".popup__about");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей about  и name из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

}
// console.log (about.textContent);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', handleFormSubmit);
// console.log(name);
// console.log(about);

