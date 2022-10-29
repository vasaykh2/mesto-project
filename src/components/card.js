export { cardContainer, createNewCard,addCard, };

import {
  setEventListenerForOpenImagePopup,
  openPopup,
  closePopup,
} from '../components/modal.js';
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

const getCardTemplate = (template, item) =>
  template.querySelector(item).cloneNode(true);

//функция создания карточки с местом, аргумент - объект с двумя ключами name и link
function createNewCard(item) {
  const cardElement = getCardTemplate(cardTemplate, '.cards__item');
  const cardImage = cardElement.querySelector('.cards__image');
  const cardLikeButton = cardElement.querySelector('.cards__like-button');
  const countLikes = cardElement.querySelector('.cards__like-counter');

//подсчет лайков на карточке
  if (!item.likes) {
    countLikes.textContent = 0;
  } else {
    countLikes.textContent = item.likes.length;
  }

  const cardId = item._id;
  cardElement.id = cardId;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.cards__name').textContent = item.name;


  //получение id пользователя для определения вида и поведения кнопки liked и добавления значка delete карточке
  function setEventListenerForLike(element) {
    getUserInfo(apiSettings)
      .then((result) => {
        // console.log(item);
        let likesLength;
        let hasIdUser;
        function checkItemLikes (likes, idUser) {
          likesLength = likes.length;
          if (likes.findIndex(el => el._id == idUser) === -1) {
            hasIdUser = false;
          } else {
            hasIdUser = true;
          }
          //console.log(likesLength, hasIdUser);
        }
        checkItemLikes (item.likes, result._id);

        //перевод like-button в liked при наличии id пользователя в объектах массива likes карточки на сервере
        if (hasIdUser == true) {
          cardLikeButton.classList.add('cards__like-button_liked');
        }


       function handleClickOnLikeButton() {
        //console.log(likesLength, hasIdUser);
        if (likesLength !== 0) {
          //console.log(item.likes);
            if (hasIdUser == false) {
              putLike(apiSettings, cardId)
                .then(() => {
                  //console.log(result);
                  //console.log(item.likes);
                })
                .then(() => {
              likesLength++;
              hasIdUser = true;
              cardLikeButton.classList.add('cards__like-button_liked');
              countLikes.textContent = likesLength;
              handleClickOnLikeButton;
              return likesLength, hasIdUser;
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              deleteLike(apiSettings, cardId)
                .then(() => {
                  //console.log(result);
                })
                .then(() => {
                  likesLength--;
                  hasIdUser = false;
                  cardLikeButton.classList.remove('cards__like-button_liked');
                  countLikes.textContent = likesLength;
                  handleClickOnLikeButton;
                  return likesLength, hasIdUser;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
        }
        else {
          putLike(apiSettings, cardId)
            .then(() => {
              //console.log(result);
            })
            .then(() => {
              likesLength++;
              hasIdUser = true;
              cardLikeButton.classList.add('cards__like-button_liked');
              countLikes.textContent = likesLength;
              handleClickOnLikeButton;
              return likesLength, hasIdUser;
            })
            .catch((err) => {
              console.log(err);
            });
        }
       }

        //слушатель кнопки liked
        element
          .querySelector('.cards__like-button')
          .addEventListener('click', handleClickOnLikeButton);


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
        closePopup(popupConfirmDelete);
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

//функция добавления созданной карточки в конец DOM-контейнера
const addCard = function (item) {
  cardContainer.append(createNewCard(item));
};
