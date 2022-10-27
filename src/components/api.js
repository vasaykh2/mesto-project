export {
  getUserMe,
  initialCards,
  editProfile,
  sendCard,
  deleteCard,
  putLike,
  deleteLike,
  updateAvatar,
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

//функция запроса удаления карточки из сервера
async function deleteCard(settings, cardId) {
  return fetch(
    `https://nomoreparties.co/v1/${settings.cohortId}/cards/${cardId}`,
    {
      method: 'DELETE',
      headers: {
        authorization: settings.token,
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//функция запроса постановки лайка карточке
async function putLike(settings, cardId) {
  return fetch(
    `https://nomoreparties.co/v1/${settings.cohortId}/cards/likes/${cardId}`,
    {
      method: 'PUT',
      headers: {
        authorization: settings.token,
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//функция запроса снятия лайка карточке
async function deleteLike(settings, cardId) {
  return fetch(
    `https://nomoreparties.co/v1/${settings.cohortId}/cards/likes/${cardId}`,
    {
      method: 'DELETE',
      headers: {
        authorization: settings.token,
      },
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//функция запроса на обновление аватара пользователя
async function updateAvatar(settings, urlAvatar) {
  return fetch(
    `https://nomoreparties.co/v1/${settings.cohortId}/users/me/avatar`,
    {
      method: 'PATCH',
      headers: {
        authorization: settings.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: urlAvatar,
      }),
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
