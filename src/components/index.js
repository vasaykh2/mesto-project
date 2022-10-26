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

import { getCards, } from '../components/api.js';

const apiSettings = {
  cohortId: 'plus-cohort-16',
  token: '9656253c-3dfe-4770-aeca-f882bc2dc634',

};

/*
initAPI(apiSettings, (api, id) => {
  //дальше все что нужно инициализируем, апи в себе хранит все что нужно просто используем
});
*/



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


getCards(apiSettings).then((result) => {
  let i = 0;
  for (i in result) {
    addCard(result[i]);
  }
});
