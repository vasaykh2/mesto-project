import './pages/index.css';

import { enableValidation } from './components/validate';
import { addCards} from './components/card';
import { openPopup, closePopup, disableButton, renderLoading } from './components/util';
import { setExitPopupListeners, handleProfileFormSubmit, handleformSubmitCardAdd } from './components/modal';
import { getCards, getUserInfo, updateAvatar } from './components/api';

const placesContainer = document.querySelector('.places');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAvatar = document.querySelector('.profile__avatar-button');
const popEdit = document.querySelector('.popup_type_edit-profile');
const popAdd = document.querySelector('.popup_type_add-place');
const popAvatar = document.querySelector('.popup_type_avatar');
const buttonAdd = document.querySelector('.profile__add-button');
const editForm = document.querySelector('.popup__form_content_edit-profile');
const formName = editForm.querySelector('.popup__field_info_name');
const formDescription = editForm.querySelector('.popup__field_info_desc');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__paragraph');
const profileImg = document.querySelector('.profile__img');
const addForm = popAdd.querySelector('.popup__form');
const cardName = addForm.querySelector('.popup__field_info_card-name');
const cardUrl = addForm.querySelector('.popup__field_info_card-img');
const cardPopup = document.querySelector('.popup_type_place');
const cardPopupName = cardPopup.querySelector('.popup__subtitle');
const cardPopupImg = cardPopup.querySelector('.popup__img');
const closeButtons = document.querySelectorAll('.popup__close-button');
const placeTemplate = document.querySelector('.place-template').content;
const popups = document.querySelectorAll('.popup__overlay');
const avatarFormImg = popAvatar.querySelector('.popup__field_info_avatar');
let profileInfo;

Promise.all([getUserInfo(), getCards()])
.then(([userData, cards]) => {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImg.src = userData.avatar;
  profileInfo = userData;
  addCards(placesContainer, cards, placeTemplate, cardPopupName, cardPopupImg, cardPopup, profileInfo);
})
.catch((err) => {
  console.log(err);
});

popAvatar.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  renderLoading(popAvatar, 'Сохранить', true);
  updateAvatar(avatarFormImg.value)
  .then((data) => {
  profileImg.src = data.avatar;
  closePopup(popAvatar);
  evt.target.reset();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    renderLoading(popAvatar, 'Сохранить', false);
  });
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

editForm.addEventListener('submit', (evt) => handleProfileFormSubmit(evt, profileName, formName, profileDescription, formDescription, popEdit));

buttonEdit.addEventListener('click', () => {
  openPopup(popEdit);
  formDescription.value = profileDescription.textContent;
  formName.value = profileName.textContent;
});
buttonAdd.addEventListener('click', () => {
  openPopup(popAdd);
  disableButton(popAdd);
});
buttonAvatar.addEventListener('click', () => {
  openPopup(popAvatar);
  disableButton(popAvatar);
})

addForm.addEventListener('submit', (evt) => handleformSubmitCardAdd(evt, cardName, cardUrl, placeTemplate, cardPopupName, cardPopupImg, cardPopup, profileInfo, popAdd, placesContainer));

popups.forEach(setExitPopupListeners);

