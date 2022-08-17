const profile = document.querySelector('.profile');
const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const cardContainer = document.querySelector('.cards');
const popupAddCard = document.querySelector('.popup_content_add-card');
const cardTemplate = document.querySelector('#card-template').content;
const popupImg = document.querySelector('.popup_content_image');
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

const editButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

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

//функция удаления карточки из имеющегося набора
function delCard(element) {
  //обработчик кнопки удаления карточки
  element
    .querySelector('.cards__delete-button')
    .addEventListener('click', (evt) => {
      evt.target.parentNode.remove();
    });
}

//функция liked карточки
function likeCard(element) {
  //обработчик кнопки liked
  element
    .querySelector('.cards__like-button')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like-button_liked');
    });
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

//функция создания карточки с местом, аргумент - объект с двумя ключами name и link
function createCard(item) {
  const cardElement = cardTemplate
    .querySelector('.cards__item')
    .cloneNode(true);
  const cardsImage = cardElement.querySelector('.cards__image');
  cardsImage.src = item.link;
  cardsImage.alt = item.name;
  cardElement.querySelector('.cards__name').textContent = item.name;

  likeCard(cardElement);
  delCard(cardElement);
  imageCard(cardElement, item);

  return cardElement;
}

//функция добавления созданной карточки с местом в DOM
function addCard(item) {
  cardContainer.prepend(createCard(item));
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

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', (evt) => {
  updateFormEditProfile();
  openPopup(popupEditProfile);
});

//обработчик всех кнопок закрытия popup (крестиков)
closeButtons.forEach((button) => {
  // поиск ближайшего (родительского) к крестику popup
  const popup = button.closest('.popup');
  // обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//обработчик submit для формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', (evt) => {
  openPopup(popupAddCard);
});

//обработчик submit для формы добавления карточки
formAddCard.addEventListener('submit', handleCardFormSubmit);

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
