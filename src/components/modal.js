import { addCard } from '../components/card.js';
import { settings, hideInputError } from '../components/validate.js';

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
const formAddCard = document.forms.formAdd;
const inputCardName = formAddCard.elements.placeName;
const inputCardLink = formAddCard.elements.placeLink;
const image = popupImg.querySelector('.popup__image');
const imageCaption = popupImg.querySelector('.popup__image-caption');

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

//обновление полей формы редактю профиля при открытии popup
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
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
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

//функция submit для формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {};
  item.name = inputCardName.value;
  item.link = inputCardLink.value;
  addCard(item);
  evt.target.reset();
  closePopup(popupAddCard);
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

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик submit для формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);

export {
  openPopupImageCard,
  editButton,
  updateFormEditProfile,
  openPopup,
  popupEditProfile,
  formEditProfile,
  addButton,
  popupAddCard,
  formAddCard,
  clearFormInputs,
};
