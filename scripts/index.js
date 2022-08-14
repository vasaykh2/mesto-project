const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupCloseButton = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector(
  '.form_content_edit-profile'
);
const inputName = popupEditProfile.querySelector('.form__item_user_name');
const inputJob = popupEditProfile.querySelector('.form__item_user_job');

const cardContainer = document.querySelector('.cards');

//открытие попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//обработчик кнопки редактирования профиля (открытия попапа редактирования профиля)
editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
});

//обработчик кнопки закрытия попап редактирования профиля
popupCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});
