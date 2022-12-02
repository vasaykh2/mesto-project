import "../index.css";

import { FormValidator } from "../components/FormValidator";
import { config } from "../utils/constants";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { disableButton, renderLoading } from "../utils/util";
import {
  validationList,
  buttonEdit,
  buttonAvatar,
  popAdd,
  popAvatar,
  buttonAdd,
  editForm,
  formName,
  formDescription,
  addForm,
  cardPopup,
  placeTemplate,
  avatarForm,
} from "../utils/constants";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { Api } from "../components/Api";
import { cardsInfo } from "../components/CardApi";
import { userInfo } from "../components/UserInfo";

const api = new Api(config);
let profileInfo;

//Серверная часть обработки данных пользователя
async function getUserInfo() {
  const result = await api.requireApi("/users/me");
  userInfo.putUserInfo(result);
  return result;
}

async function setUserInfo(name, about) {
  const result = await api.requireApi(
    "/users/me",
    { name: `${name}`, about: `${about}` },
    "PATCH"
  );
  userInfo.putUserInfo(result);
  return result;
}

async function updateAvatar(newImg) {
  return await api.requireApi("/users/me/avatar", { avatar: newImg }, "PATCH");
}

function createCard(cardItem) {
  const newCard = new Card(
    placeTemplate,
    cardItem,
    profileInfo,
    handleCardClick,
    handleLikeButtonClick,
    handleDelButtonClick
  );
  const cardElement = newCard.generate(cardItem);
  return cardElement;
}

const cardsContainer = new Section(
  {
    renderer: (cardItem) => {
      cardsContainer.setItem(createCard(cardItem));
    },
  },
  document.querySelector(".places")
);

Promise.all([getUserInfo(), cardsInfo.getCards()])
  .then(([userData, cards]) => {
    userInfo.putAvatar(userData);
    profileInfo = userData;
    cardsContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function handleCardClick(evt) {
  popupWithImage.open(evt.target.currentSrc, evt.target.alt);
}

const profilePopup = new PopupWithForm(".popup_type_edit-profile", {
  handleFormSubmit: (formData) => {
    renderLoading(editForm, "Сохранить", true);
    setUserInfo(formData.name, formData.nickname)
      .then((user) => {
        userInfo.putUserInfo(user);
        profilePopup.close();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        renderLoading(editForm, "Сохранить", false);
      });
  },
});

const avatarPopup = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: (formData) => {
    renderLoading(avatarForm, "Сохранить", true);
    updateAvatar(formData["avatar-url"])
      .then((data) => {
        userInfo.putAvatar(data);
        avatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(avatarForm, "Сохранить", false);
      });
  },
});

const addCardPopup = new PopupWithForm(".popup_type_add-place", {
  handleFormSubmit: (formData) => {
    renderLoading(addForm, "Создать", true);
    cardsInfo
      .postCard(formData["place-title"], formData["image-url"])
      .then((data) => {
        cardsContainer.renderItems(data);
        addCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(addForm, "Создать", false);
      });
  },
});

//Серверная и исполнительная части обработки данных карточек
//Обработчик лайков
function handleLikeButtonClick(likesCheck, dataCard) {
  if (likesCheck) {
    cardsInfo
      .deleteLikeCard(dataCard._cardInfo._id)
      .then((data) => {
        dataCard.togglLike(data);
      })
      .catch((err) => console.log(err));
  } else {
    cardsInfo
      .likeCard(dataCard._cardInfo._id)
      .then((data) => {
        dataCard.togglLike(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Обработчики удаления
let dataDelCard;
function handleDelButtonClick(dataCard) {
  popDelConfirm.open();
  dataDelCard = dataCard;
}

const popDelConfirm = new PopupWithForm(".popup_type_confirm-delete", {
  handleFormSubmit,
});

function handleFormSubmit() {
  cardsInfo
    .deleteCard(dataDelCard._cardInfo._id)
    .then(() => {
      dataDelCard.removeCard();
      popDelConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}
//Попап картинки
const popupWithImage = new PopupWithImage(cardPopup);

const editFormValidator = new FormValidator(validationList, editForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationList, addForm);
addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationList, avatarForm);
avatarFormValidator.enableValidation();

buttonEdit.addEventListener("click", () => {
  profilePopup.open();
  const userInformation = userInfo.getUserInfo();
  formName.value = userInformation.name;
  formDescription.value = userInformation.description;
});

buttonAdd.addEventListener("click", () => {
  disableButton(popAdd);
  addCardPopup.open();
});

buttonAvatar.addEventListener("click", () => {
  disableButton(popAvatar);
  avatarPopup.open();
});

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
popupWithImage.setEventListeners();
popDelConfirm.setEventListeners();
