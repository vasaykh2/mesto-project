import '../pages/index.css';

import { initialAvatar, addAvatar } from '../components/utils.js';

import { initialCards, addCard } from '../components/card.js';

import { enableValidation } from '../components/validate.js';

import {
  editButton,
  updateFormEditProfile,
  openPopup,
  popupEditProfile,
  addButton,
  popupAddCard,
} from '../components/modal.js';

//добавление картинки в аватар профиля
addAvatar(initialAvatar);

//включение валидации
enableValidation();

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', (evt) => {
  updateFormEditProfile();
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', (evt) => {
  openPopup(popupAddCard);
});

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
