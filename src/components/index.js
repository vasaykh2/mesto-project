export { apiSettings };

import '../pages/index.css';

import { initlAvatar, saveUserInfo } from '../components/utils.js';

import { addCard } from '../components/card.js';

import {
  settings,
  clearFormInputs,
  enableValidation,
  disableSubmitButton,
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
  formUpdateAvatar,
  handleProfileFormSubmit,
  handleCardFormSubmit,
  handleUpdateAvatarSubmit,
} from '../components/modal.js';

import { getUserInfo, fetchInitialCards } from '../components/api.js';

const apiSettings = {
  cohortId: 'plus-cohort-16',
  token: '9656253c-3dfe-4770-aeca-f882bc2dc634',
};

const inputList = Array.from(formAddCard);
const buttonElement = formAddCard.querySelector(settings.saveButton);
let userId;

//включение валидации
enableValidation(settings);

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', () => {
  clearFormInputs(formEditProfile);
  updateFormEditProfile();
  disableSubmitButton(buttonElement, true);
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', () => {
  clearFormInputs(formAddCard);
  toggleButtonState(inputList, buttonElement, settings);
  openPopup(popupAddCard);
});

//отрисовка карточек
function renderInitialCards(result, userId) {
  result.forEach((element) => {
    //console.log(element);
    //debugger
    addCard(element, userId);
  });
  console.log(result);
}

//инициация из сервера данных в профиль пользователя
getUserInfo(apiSettings)
  .then((result) => {
    //добавление картинки в аватар профиля
    initlAvatar(result);
    //добавление name и about пользователя
    saveUserInfo(result);
    //console.log(result);
    userId = result._id;
    //console.log(userId);
    //инициация из сервера карточек при загрузке страницы
    fetchInitialCards(apiSettings).then((data) => renderInitialCards(data, userId));
  })
  .catch((err) => {
    console.log(err);
  });

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик submit для формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);

//обработчик submit для формы редактирования аватара
formUpdateAvatar.addEventListener('submit', handleUpdateAvatarSubmit);
