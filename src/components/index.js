import '../pages/index.css';

import { initialAvatar, addAvatar } from '../components/utils.js';

import { initialCards, addCard } from '../components/card.js';

import { enableValidation } from '../components/validate.js';

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
  clearFormInputs(formEditProfile)
  updateFormEditProfile();
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', (evt) => {
  clearFormInputs(formAddCard);
  openPopup(popupAddCard);
});

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
