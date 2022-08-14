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

const initialCards = [
  {
    name: 'з. Таганай',
    link: './images/taganay-national-park.jpg',
  },
  {
    name: 'н.п. Югыд Ва',
    link: './images/yugyd-va-national-park.jpg',
  },
  {
    name: 'Мань-Пупу-нёр',
    link: './images/manpupuner-plateau.jpg',
  },
  {
    name: 'гора Шихан',
    link: './images/lake-arakul-and-arakul-shikhan.jpg',
  },
  {
    name: 'р. Чусовая',
    link: './images/chusovaya-river.jpg',
  },
  {
    name: 'оз. Тургояк',
    link: './images/lake-turgoyak.jpg',
  },
];

const cardContainer = document.querySelector('.cards');

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
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

//функция добавления карточки с местом, аргумент - объект с двумя ключами name и link
function addCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate
    .querySelector('.cards__item')
    .cloneNode(true);
  cardElement.querySelector('.cards__name').textContent = item.name;
  cardElement.querySelector('.cards__image').src = item.link;
  cardElement
    .querySelector('.cards__like-button')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like-button_liked');
    });

  cardContainer.prepend(cardElement);
}

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', function () {
  updateFormEditProfile();
  openPopup(popupEditProfile);
});

//обработчик кнопки закрытия popup редактирования профиля
popupCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
