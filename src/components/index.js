import { initialCards, addCard } from '../components/card.js';
import {
  editButton,
  updateFormEditProfile,
  openPopup,
  popupEditProfile,
  addButton,
  popupAddCard,
} from '../components/modal.js';

//обработчик кнопки редактирования профиля (открытия popup редактирования профиля)
editButton.addEventListener('click', (evt) => {
  updateFormEditProfile();
  openPopup(popupEditProfile);
});

//обработчик кнопки открытия popup для добавления карточки
addButton.addEventListener('click', (evt) => {
  openPopup(popupAddCard);
});

//добавление 6 карточек при загрузке страницы
initialCards.forEach((item) => {
  addCard(item);
});
