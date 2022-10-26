export { getCards };

const apiSettings = {
  cohortId: 'plus-cohort-16',
  token: '9656253c-3dfe-4770-aeca-f882bc2dc634',
};

/*
async function initAPI(settings, cb) {
  //получаем ID
  const id = await fetch ...;
  //объявляем функции апи
  const api = { ... };
  cb(api, id);
}
*/

import { initialCards, addCard } from '../components/card.js';

async function getCards(settings, cb) {
  return fetch(`https://nomoreparties.co/v1/${settings.cohortId}/cards`, {
    method: 'GET',
    headers: {
      authorization: settings.token,
    },
  }).then((res) => res.json());
}


/*
[
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },
  {
    "likes": [],
    "_id": "5d1f064ed321eb4bdcd707de",
    "name": "Архыз",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:11:58.324Z"
  }
]
*/
/*
function getUser() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-16/users/me', {
    method: 'GET',
    headers: {
      authorization: '9656253c-3dfe-4770-aeca-f882bc2dc634',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
}
getUser();
//Используйте свойства name, about и avatar в соответствующих элементах шапки страницы. Свойство _id — идентификатор пользователя, в данном случае вашего.

//{name: 'Jacques Cousteau', about: 'Sailor, researcher', avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg', _id: 'b928463b11692c2e10ed9588', cohort: 'plus-cohort-16'}
//I'm #39
/*
.then(res => {
  if (res.ok) {
  return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
  });
*/
