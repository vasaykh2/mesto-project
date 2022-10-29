import { addCard } from '../components/card.js';
import { settings, hideInputError } from '../components/validate.js';
import {
  editProfile,
  getUserInfo,
  createCard,
  updateAvatar,
} from '../components/api.js';
import { apiSettings } from '../components/index.js';
import {
  initialAvatar,
  initialUser,
  renderLoading,
} from '../components/utils.js';

export {
  setEventListenerForOpenImagePopup,
  editButton,
  updateFormEditProfile,
  openPopup,
  closePopup,
  popupEditProfile,
  profileName,
  profileJob,
  formEditProfile,
  addButton,
  popupAddCard,
  formAddCard,
  popupUpdateAvatar,
  formUpdateAvatar,
  handleProfileFormSubmit,
  handleCardFormSubmit,
  handleUpdateAvatarSubmit,
};

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupAddCard = document.querySelector('.popup_content_add-card');
const popupImg = document.querySelector('.popup_content_image');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const formEditProfile = document.forms.formEdit;
const inputName = formEditProfile.elements.userName;
const inputJob = formEditProfile.elements.userJob;
const editProfileButton = formEditProfile.querySelector('.form__save-button');
const formAddCard = document.forms.formAdd;
const inputCardName = formAddCard.elements.placeName;
const inputCardLink = formAddCard.elements.placeLink;
const addCardButton = formAddCard.querySelector('.form__save-button');
const image = popupImg.querySelector('.popup__image');
const imageCaption = popupImg.querySelector('.popup__image-caption');
const popupUpdateAvatar = document.querySelector(
  '.popup_content_update-avatar'
);
const formUpdateAvatar = document.forms.formAvatar;
const inputAvatarUrl = formUpdateAvatar.elements.updateAvatar;
const updateAvatarButton = formUpdateAvatar.querySelector('.form__save-button');

//открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//обновление полей формы редактора профиля при открытии popup
function updateFormEditProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

//функция submit для формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editProfileButton, 'Сохранение...');
  //запрос на сервер обновления name и about профиля пользователя
  editProfile(apiSettings, inputName.value, inputJob.value)
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      renderLoading(editProfileButton, 'Сохранить');
      initialUser({ name: inputName.value, about: inputJob.value });
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция submit для формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(addCardButton, 'Создаётся...');
  const item = {};
  item.name = inputCardName.value;
  item.link = inputCardLink.value;
  //отправка новой карточки на сервер
  createCard(apiSettings, item.name, item.link)
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      renderLoading(editProfileButton, 'Сохранить');
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция submit для формы редактирования аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(updateAvatarButton, 'Сохранение...');
  const urlAvatar = inputAvatarUrl.value;
  //отправка url нового аватара на сервер
  updateAvatar(apiSettings, urlAvatar)
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      getUserInfo(apiSettings)
        .then((res) => {
          //добавление картинки в аватар профиля
          initialAvatar(res);
        })
        .then(() => {
          renderLoading(updateAvatarButton, 'Сохранить');
          closePopup(popupUpdateAvatar);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция открытия popup-img карточки
function setEventListenerForOpenImagePopup(element, item) {
  //обработчик клика на картинку карточки и открытия popup
  element.querySelector('.cards__image').addEventListener('click', () => {
    image.src = item.link;
    image.alt = item.name;
    imageCaption.textContent = item.name;
    openPopup(popupImg);
  });
}

//функция активации обработки нажатия "Escape" в модальном окне
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//обработчик нажатия на оверлеи или крестики всех popup, когда они открыты
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});
