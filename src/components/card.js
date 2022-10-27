import { openPopupImageCard, openPopup } from '../components/modal.js';
import {
  getUserMe,
  deleteCard,
  initialCards,
  putLike,
  deleteLike,
} from '../components/api.js';
import { apiSettings } from '../components/index.js';

const ChartCard = (function () {
  const cardContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card-template').content;
  const popupConfirmDelete = document.querySelector(
    '.popup_content_confirm-delete'
  );

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
    cardElement.id = cardId;
    cardsImage.src = item.link;
    cardsImage.alt = item.name;
    cardElement.querySelector('.cards__name').textContent = item.name;
    cardElement.querySelector('.cards__like-counter').textContent = countLikes;

    //функция liked карточки
    function likeCard(element) {
      getUserMe(apiSettings).then((result) => {
        //перевод like-button в liked при наличии id пользователя в объектах массива likes карточки на сервере
        let j = 0;
        for (j in item.likes) {
          if (item.likes[j]._id === result._id) {
            document
              .getElementById(`${item._id}`)
              .querySelector('.cards__like-button')
              .classList.add('cards__like-button_liked');

              //обработчик кнопки liked
      element
      .querySelector('.cards__like-button')
      .addEventListener('click', (evt) => {
        deleteLike(apiSettings, cardId).then(() => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          location.reload();
        });
      });
          } else {
          //обработчик кнопки liked
      element
      .querySelector('.cards__like-button')
      .addEventListener('click', (evt) => {
        putLike(apiSettings, cardId).then(() => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          location.reload();
        });
      });
    }
    }


      let k = 0;
        for (k in item) {
      if (item.likes.length === 0) {
        //console.log(item);

           //обработчик кнопки liked
      element
      .querySelector('.cards__like-button')
      .addEventListener('click', (evt) => {
        putLike(apiSettings, cardId).then(() => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          location.reload();
        });
      });
      }
    }

      });
    }

    function handleConfirmDeleteSubmit(evt) {
      evt.preventDefault();
      //запрос на сервер удаления карточки
      deleteCard(apiSettings, cardId).then(() => {
        //console.log(result);
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    }

    //функция удаления карточки из имеющегося набора
    function delCard(element) {
      //сравнение id owner карточки с пользовательским и добавление значка delete в карточку
      getUserMe(apiSettings).then((result) => {
        if (item.owner._id === result._id) {
          cardElement.querySelector('.cards__delete-button').style.display =
            'block';
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
