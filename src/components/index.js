import '../pages/index.css';

import { initialAvatar, initialUser, } from '../components/utils.js';

import { addCard } from '../components/card.js';

import {
  settings,
  enableValidation,
  toggleButtonState,
} from '../components/validate.js';

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
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from '../components/modal.js';

import { getUserMe, initialCards } from '../components/api.js';

export { apiSettings, }


const apiSettings = {
  cohortId: 'plus-cohort-16',
  token: '9656253c-3dfe-4770-aeca-f882bc2dc634',
};

/*
initAPI(apiSettings, (api, id) => {
  //дальше все что нужно инициализируем, апи в себе хранит все что нужно просто используем
});
*/

//инициация из сервера данных в профиль пользователя
getUserMe(apiSettings).then((result) => {
  //добавление картинки в аватар профиля
  initialAvatar(result);
  //добавление name и about пользователя
  initialUser(result);
  //console.log(result);
});

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

//инициация из сервера карточек при загрузке страницы
initialCards(apiSettings).then((result) => {
  let i = 0;
  for (i in result) {
    addCard(result[i]);
  };
  console.log(result);
});

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик submit для формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);
