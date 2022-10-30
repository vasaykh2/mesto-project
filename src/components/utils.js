export { initlAvatar, saveUserInfo, renderLoading };

import { profileName, profileJob } from '../components/modal.js';

import {
  openPopup,
  formUpdateAvatar,
  popupUpdateAvatar,
} from '../components/modal.js';

import {
  clearFormInputs,
  settings,
  toggleButtonState,
} from '../components/validate.js';

const avatarImage = document.querySelector('.profile__avatar');
const inputListFormUpdateAvatar = Array.from(formUpdateAvatar);
const buttonElementFormUpdateAvatar = formUpdateAvatar.querySelector(
  settings.saveButton
);

//функция добавления атрибутов в img аватара
const initlAvatar = function (item) {
  avatarImage.src = item.avatar;
  avatarImage.alt = item.name;
  //слушатель наведения мыши на аватар с изменением класса псевдоэлемента
  avatarImage.addEventListener('mouseover', () => {
    document.querySelector('.profile__wrapper-avatar').className =
      'profile__wrapper-avatar new';
  });
  //слушатель выхода мыши из аватара с возвращением прежднего класса псевдоэлемента
  avatarImage.addEventListener('mouseout', () => {
    document.querySelector('.profile__wrapper-avatar.new').className =
      'profile__wrapper-avatar';
  });
  //слушатель клика по аватару с открытием попапа
  avatarImage.addEventListener('click', () => {
    clearFormInputs(formUpdateAvatar);
    toggleButtonState(
      inputListFormUpdateAvatar,
      buttonElementFormUpdateAvatar,
      settings
    );
    openPopup(popupUpdateAvatar);
  });
};
//функция добавления атрибутов в name и about пользователя
const saveUserInfo = function (item) {
  profileName.textContent = item.name;
  profileJob.textContent = item.about;
};

const renderLoading = (button, txt) => (button.textContent = txt);
