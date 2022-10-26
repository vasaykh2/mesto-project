const cousteauImage = new URL(
  '../Vendor/images/jacques-yves-cousteau.jpg',
  import.meta.url
);

const initialAvatar = {
  name: 'Жак-Ив Кусто',
  link: cousteauImage,
};

const ChartAvatar = (function () {
  const avatarImage = document.querySelector('.profile__avatar');
  return {
    //функция добавления атрибутов в img аватара
    addAvatar: function (item) {
      avatarImage.src = item.avatar;
      avatarImage.alt = item.name;
    },
  };
})();

const addAvatar = ChartAvatar.addAvatar;

export { addAvatar, };
