import { profileName, profileJob } from '../components/modal.js';

export { initialAvatar, initialUser, };

const ChartProfile = (function () {
  const avatarImage = document.querySelector('.profile__avatar');
  return {
    //функция добавления атрибутов в img аватара
    initialAvatar: function (item) {
      avatarImage.src = item.avatar;
      avatarImage.alt = item.name;
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
