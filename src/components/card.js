import { imageCard } from '../components/modal.js';

const initialCards = [
  {
    name: 'з. Таганай',
    link: '../src/Vendor/images/taganay-national-park.jpg',
  },
  {
    name: 'н.п. Югыд Ва',
    link: '../src/Vendor/images/yugyd-va-national-park.jpg',
  },
  {
    name: 'Мань-Пупу-нёр',
    link: '../src/Vendor/images/manpupuner-plateau.jpg',
  },
  {
    name: 'гора Шихан',
    link: '../src/Vendor/images/lake-arakul-and-arakul-shikhan.jpg',
  },
  {
    name: 'р. Чусовая',
    link: '../src/Vendor/images/chusovaya-river.jpg',
  },
  {
    name: 'оз. Тургояк',
    link: '../src/Vendor/images/lake-turgoyak.jpg',
  },
];

const ChartCard = (function () {
  const cardContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card-template').content;

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

  return {
    //функция добавления созданной карточки с местом в DOM
    addCard: function (item) {
      cardContainer.prepend(createCard(item));
    },
  };
})();

const addCard = ChartCard.addCard;

export { initialCards, addCard };
