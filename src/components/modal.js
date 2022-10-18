import { addCard } from '../components/card.js';

const profile = document.querySelector('.profile');

const editButton = profile.querySelector('.profile__edit-button');

const popupEditProfile = document.querySelector('.popup_content_edit-profile');

const popupAddCard = document.querySelector('.popup_content_add-card');

const popupImg = document.querySelector('.popup_content_image');
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const formEditProfile = popupEditProfile.querySelector(
  '.form_content_edit-profile'
);
const inputName = popupEditProfile.querySelector('.form__item_user_name');
const inputJob = popupEditProfile.querySelector('.form__item_user_job');
const addButton = profile.querySelector('.profile__add-button');
const formAddCard = popupAddCard.querySelector('.form_content_add-card');
const inputCardName = popupAddCard.querySelector('.form__item_place_name');
const inputCardLink = popupAddCard.querySelector('.form__item_place_link');
const image = popupImg.querySelector('.popup__image');
const imageCaption = popupImg.querySelector('.popup__image-caption');

//открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//обновление полей формы редактю профиля при открытии popup
function updateFormEditProfile() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

//функция submit для формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//функция открытия popup-img карточки
function imageCard(element, item) {
  //обработчик клика на картинку карточки и открытия popup
  element.querySelector('.cards__image').addEventListener('click', (evt) => {
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

//обработчик всех кнопок закрытия popup (крестиков)
closeButtons.forEach((button) => {
  // поиск ближайшего (родительского) к крестику popup
  const popup = button.closest('.popup');
  // обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик submit для формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);

export {
  imageCard,
  editButton,
  updateFormEditProfile,
  openPopup,
  popupEditProfile,
  addButton,
  popupAddCard,
};
