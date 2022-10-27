import { profileName, profileJob } from '../components/modal.js';

import {
  openPopup,
} from '../components/modal.js';

export { initialAvatar, initialUser };

const ChartProfile = (function () {
  const avatarImage = document.querySelector('.profile__avatar');
  return {
    //функция добавления атрибутов в img аватара
    initialAvatar: function (item) {
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
        openPopup(document.querySelector('.popup_content_update-avatar'));
      });
    },
    //функция добавления атрибутов в name и about пользователя
    initialUser: function (item) {
      profileName.textContent = item.name;
      profileJob.textContent = item.about;
    },
  };
})();

const initialAvatar = ChartProfile.initialAvatar;
const initialUser = ChartProfile.initialUser;
