import "../pages/index.css";
import "./api.js";
import "./utils.js";
import "./modal.js";
import "./profile.js";
import "./cards.js";
import "./validation.js";

import { getAllInfo } from "./api.js";
import { profileName, profession, avatarOnPage } from "./profile.js";
import { renderCard, elementsList } from "./cards.js";

let userId = null;
// Выгружаем с сервера карточки из пула + данные пользователя 
getAllInfo()
  .then(([cards, user]) => {
    profileName.textContent = user.name;
    profession.textContent = user.about;
    avatarOnPage.src = user.avatar;
    userId = user._id;
    cards.reverse().forEach((data) => {
      renderCard(data, elementsList, userId);
    });
  })
  .catch(err => console.log(err));

export { userId }