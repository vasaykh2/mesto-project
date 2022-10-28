import { addCard } from '../components/card.js';
import { settings, hideInputError } from '../components/validate.js';
import {
  editProfile,
  getUserMe,
  sendCard,
  updateAvatar,
} from '../components/api.js';
import { apiSettings } from '../components/index.js';
import { initialAvatar, initialUser } from '../components/utils.js';

export {
  openPopupImageCard,
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
  clearFormInputs,
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
const EditProfileButton = formEditProfile.querySelector('.form__save-button');
const formAddCard = document.forms.formAdd;
const inputCardName = formAddCard.elements.placeName;
const inputCardLink = formAddCard.elements.placeLink;
const AddCardButton = formAddCard.querySelector('.form__save-button');
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

//очистка полей формы
function clearFormInputs(form) {
  const inputs = Array.from(form.querySelectorAll(settings.input));
  inputs.forEach((input) => {
    input.value = '';
    hideInputError(form, input, settings);
  });
}

//функция submit для формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  EditProfileButton.textContent = 'Сохранение...';
  //запрос на сервер обновления name и about профиля пользователя
  editProfile(apiSettings, inputName.value, inputJob.value)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      EditProfileButton.textContent = 'Сохранить';
      initialUser({ name: inputName.value, about: inputJob.value });
      closePopup(popupEditProfile);
    });
}

//функция submit для формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  AddCardButton.textContent = 'Создаётся...';
  const item = {};
  item.name = inputCardName.value;
  item.link = inputCardLink.value;
  //отправка новой карточки на сервер
  sendCard(apiSettings, item.name, item.link).then((result) => {
    console.log(result);
  })
  .then(() => {
    EditProfileButton.textContent = 'Сохранить';
    location.reload();
  });
}

//функция submit для формы редактирования аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  updateAvatarButton.textContent = 'Сохранение...';
  const urlAvatar = inputAvatarUrl.value;
  //отправка url нового аватара на сервер
  updateAvatar(apiSettings, urlAvatar)
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      getUserMe(apiSettings)
        .then((res) => {
          //добавление картинки в аватар профиля
          initialAvatar(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          updateAvatarButton.textContent = 'Сохранить';
          closePopup(popupUpdateAvatar);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

//функция открытия popup-img карточки
function openPopupImageCard(element, item) {
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
