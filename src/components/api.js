export { getUserMe, initialCards, editProfile, sendCard, };

/*
async function initAPI(settings, cb) {
  //получаем ID
  const id = await fetch ...;
  //объявляем функции апи
  const api = { ... };
  cb(api, id);
}
*/

//функция запроса всех параметров пользователя профиля из сервера
async function getUserMe(settings) {
  return fetch(`https://nomoreparties.co/v1/${settings.cohortId}/users/me`, {
    method: 'GET',
    headers: {
      authorization: settings.token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//функция запроса параметров карточки из сервера
async function initialCards(settings) {
  return fetch(`https://nomoreparties.co/v1/${settings.cohortId}/cards`, {
    method: 'GET',
    headers: {
      authorization: settings.token,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//функция запроса на обновление параметров пользователя в профиле на сервере
async function editProfile(settings, name, about) {
  return fetch(`https://nomoreparties.co/v1/${settings.cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: settings.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//функция запроса на отправку новой карточки на сервере
async function sendCard(settings, name, link) {
  return fetch(`https://nomoreparties.co/v1/${settings.cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: settings.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
