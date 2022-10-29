export { addCard };

import { setEventListenerForOpenImagePopup, openPopup, closePopup } from '../components/modal.js';
import {
  getUserInfo,
  deleteCard,
  putLike,
  deleteLike,
} from '../components/api.js';
import { apiSettings } from '../components/index.js';

const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const popupConfirmDelete = document.querySelector(
  '.popup_content_confirm-delete'
);



const getCardTemplate = (template, item) => template.querySelector(item).cloneNode(true);

//функция создания карточки с местом, аргумент - объект с двумя ключами name и link
function createCard(item) {
  const cardElement = getCardTemplate(cardTemplate,'.cards__item');
  const cardsImage = cardElement.querySelector('.cards__image');
  let countLikes;
  if (!item.likes) {
    countLikes = 0;
  } else {
    countLikes = item.likes.length;
  }
  const cardId = item._id;
  cardElement.id = cardId;
  cardsImage.src = item.link;
  cardsImage.alt = item.name;
  cardElement.querySelector('.cards__name').textContent = item.name;
  cardElement.querySelector('.cards__like-counter').textContent = countLikes;

  //получение id пользователя для определения вида и поведения кнопки liked и добавления значка delete карточке
  function setEventListenerForLike(element) {
    getUserInfo(apiSettings).then((result) => {
      //перевод like-button в liked при наличии id пользователя в объектах массива likes карточки на сервере
    let j = 0;
      for (j in item.likes) {
        if (item.likes[j]._id === result._id) {
          cardElement.querySelector('.cards__like-button')
            .classList.add('cards__like-button_liked');
      }
    }
  // console.log(item);

//обработчик кнопки liked
          element
            .querySelector('.cards__like-button')
            .addEventListener('click', (evt) => {
//console.log(item.likes)
if (item.likes.length !== 0) {
  console.log(item.likes)
      let i =0;
      for (i in item.likes) {
        if (item.likes[i]._id !== result._id) {
          putLike(apiSettings, cardId)
        .then(() => {
          console.log(result);
        })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
        } else {
        deleteLike(apiSettings, cardId)
        .then(() => {
          console.log(result);
        })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      };
   }
  } else {
    putLike(apiSettings, cardId)
        .then(() => {
          console.log(result);
        })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
  }
          });

          //добавление значка delete в карточку по результатам сравнения id owner карточки с пользовательским
    if (item.owner._id === result._id) {
        cardElement.querySelector('.cards__delete-button').style.display =
          'block';
      }
    })
.catch((err) => {
      console.log(err);
        });
    }

  function handleConfirmDeleteSubmit(evt) {
    evt.preventDefault();
    //запрос на сервер удаления карточки
    deleteCard(apiSettings, cardId)
      .then(() => {
       closePopup(popupConfirmDelete)
       cardElement.remove();
       //console.log(cardElement);
       //console.log(evt);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //функция удаления карточки из имеющегося набора
  function setEventListenerForCardRemoval(element) {

    //обработчик кнопки удаления карточки
    element
      .querySelector('.cards__delete-button')
      .addEventListener('click', () => {
        openPopup(popupConfirmDelete);
        document
          .querySelector('.form_content_confirm-delete')
          .addEventListener('submit', handleConfirmDeleteSubmit);
      });
  }

  setEventListenerForLike(cardElement);
  setEventListenerForCardRemoval(cardElement);
  setEventListenerForOpenImagePopup(cardElement, item);

  return cardElement;
}

//функция добавления созданной карточки с местом в DOM
const addCard = function (item) {
  cardContainer.prepend(createCard(item));
};
