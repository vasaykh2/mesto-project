import { openPopupImageCard } from '../components/modal.js';

const ChartCard = (function () {
  const cardContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card-template').content;

  //функция удаления карточки из имеющегося набора
  function delCard(element) {
    //обработчик кнопки удаления карточки
    element
      .querySelector('.cards__delete-button')
      .addEventListener('click', (evt) => {
        evt.target.closest('.cards__item').remove();
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
