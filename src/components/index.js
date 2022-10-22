import '../pages/index.css';

import { initialAvatar, addAvatar } from '../components/utils.js';

import { initialCards, addCard } from '../components/card.js';

import { enableValidation, toggleButtonState } from '../components/validate.js';

import {
  editButton,
  updateFormEditProfile,
  openPopup,
  popupEditProfile,
  formEditProfile,
  addButton,
  popupAddCard,
  formAddCard,
  clearFormInputs,
} from '../components/modal.js';

//добавление картинки в аватар профиля
addAvatar(initialAvatar);

//включение валидации
enableValidation();

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', (evt) => {
  clearFormInputs(formEditProfile);
  updateFormEditProfile();
  const buttonElement = formEditProfile.querySelector('.form__save-button');
  buttonElement.disabled = true;
  buttonElement.classList.add('form__save-button_inactive');
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', (evt) => {
  clearFormInputs(formAddCard);
  const inputList = Array.from(formAddCard);
  const buttonElement = formAddCard.querySelector('.form__save-button');
  toggleButtonState(inputList, buttonElement);
  openPopup(popupAddCard);
});

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
