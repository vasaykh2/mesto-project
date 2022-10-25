import '../pages/index.css';

import { initialAvatar, addAvatar } from '../components/utils.js';

import { initialCards, addCard } from '../components/card.js';

import { settings, enableValidation, toggleButtonState } from '../components/validate.js';

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
enableValidation(settings);

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', () => {
  clearFormInputs(formEditProfile);
  updateFormEditProfile();
  const buttonElement = formEditProfile.querySelector(settings.saveButton);
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.saveButtonInactive);
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', () => {
  const inputList = Array.from(formAddCard);
  const buttonElement = formAddCard.querySelector(settings.saveButton);
  toggleButtonState(inputList, buttonElement, settings);
  openPopup(popupAddCard);
});

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
