import '../pages/index.css';

import { initialAvatar, initialUser, } from '../components/utils.js';

import { addCard } from '../components/card.js';

import {
  settings,
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
  clearFormInputs,
  formUpdateAvatar,
  handleProfileFormSubmit,
  handleCardFormSubmit,
  handleUpdateAvatarSubmit,
} from '../components/modal.js';

import { getUserInfo, fetchInitialCards } from '../components/api.js';

export { apiSettings, }


const apiSettings = {
  cohortId: 'plus-cohort-16',
  token: '9656253c-3dfe-4770-aeca-f882bc2dc634',
};

const inputList = Array.from(formAddCard);
const buttonElement = formAddCard.querySelector(settings.saveButton);



//включение валидации
enableValidation(settings);


//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', () => {
  clearFormInputs(formEditProfile);
  updateFormEditProfile();

  disableSubmitButton (buttonElement);
  buttonElement.classList.add(settings.saveButtonInactive);
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', () => {
  toggleButtonState(inputList, buttonElement, settings);
  openPopup(popupAddCard);
});


//инициация из сервера данных в профиль пользователя
getUserInfo(apiSettings).then((result) => {
  //добавление картинки в аватар профиля
  initialAvatar(result);
  //добавление name и about пользователя
  initialUser(result);
  //console.log(result);
})
.catch((err) => {
  console.log(err);
})
.then(() => {
//инициация из сервера карточек при загрузке страницы
fetchInitialCards(apiSettings).then((result) => {
  let i = 0;
  for (i in result) {
    addCard(result[i]);
  };
  console.log(result);
})
.catch((err) => {
  console.log(err);
});
});

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик submit для формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);

//обработчик submit для формы редактирования аватара
formUpdateAvatar.addEventListener('submit', handleUpdateAvatarSubmit);
