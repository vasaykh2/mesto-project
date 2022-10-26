import {
  openPopupImageCard,
  openPopup,
  } from '../components/modal.js';
import { getUserMe, deleteCard } from '../components/api.js';
import { apiSettings } from '../components/index.js';

const ChartCard = (function () {
  const cardContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card-template').content;
  const popupConfirmDelete = document.querySelector(
    '.popup_content_confirm-delete'
  );

  //https://kartinkin.net/uploads/posts/2022-03/1647854234_1-kartinkin-net-p-temnaya-noch-kartinki-1.jpg

  //https://www.zastavki.com/pictures/originals/2015/Fantasy_Battle_of_the_dragon_and_phoenix_101205_.jpg

  //функция liked карточки
  function likeCard(element) {
    //обработчик кнопки liked
    element
      .querySelector('.cards__like-button')
      .addEventListener('click', (evt) => {
        evt.target.classList.toggle('cards__like-button_liked');
      });
  }

  //функция создания карточки с местом, аргумент - объект с двумя ключами name и link
  function createCard(item) {
    const cardElement = cardTemplate
      .querySelector('.cards__item')
      .cloneNode(true);
    const cardsImage = cardElement.querySelector('.cards__image');
    let countLikes;
    if (!item.likes) {
      countLikes = 0;
    } else {
      countLikes = item.likes.length;
    }
    const cardId = item._id;
    cardsImage.src = item.link;
    cardsImage.alt = item.name;
    cardElement.querySelector('.cards__name').textContent = item.name;
    cardElement.querySelector('.cards__like-counter').textContent = countLikes;

    function handleConfirmDeleteSubmit(evt) {
      evt.preventDefault();
      //запрос на сервер удаления карточки
      deleteCard(apiSettings, cardId).then(() => {
        //console.log(result);
        location.reload();
      });
    }

    //функция удаления карточки из имеющегося набора
    function delCard(element) {
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

    likeCard(cardElement);
    delCard(cardElement);
    openPopupImageCard(cardElement, item);

    //сравнение ip с пользовательским и добавление значка delete в карточку
    getUserMe(apiSettings).then((result) => {
      if (item.owner._id === result._id) {
        cardElement.querySelector('.cards__delete-button').style.display =
          'block';
      }
    });

    return cardElement;
  }

  return {
    //функция добавления созданной карточки с местом в DOM
    addCard: function (item) {
      cardContainer.prepend(createCard(item));
    },
  };
})();

const addCard = ChartCard.addCard;

export { addCard };
