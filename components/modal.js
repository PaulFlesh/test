import { avatarInput, nameInput, jobInput, profileName, profession, avatarOnPage, formAvatar, formProfile } from "./profile.js";
import { clearError, renderLoading } from "./utils.js";
import { formPlace } from "./cards.js";
import { getUserInfo } from "./api.js";

const avatarPopup = document.querySelector('.popup_avatar');
const profilePopup = document.querySelector('.popup_profile');
const placePopup = document.querySelector('.popup_place');

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', handleEscapeKey);
}
const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEscapeKey);
  popup.removeEventListener('mousedown', closeByOverlay);
  popup.classList.remove('popup_opened');
}

const openAvatarPopup = () => {
  avatarInput.value = avatarOnPage.src;
  clearError(formAvatar);
  openPopup(avatarPopup);
}

const openProfilePopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent;
  clearError(formProfile);
  openPopup(profilePopup);
}

const openPlacePopup = () => {
  clearError(formPlace);
  openPopup(placePopup);
}

document.querySelector('.profile__avatar').addEventListener('click', openAvatarPopup);
document.querySelector('.profile__edit-button').addEventListener('click', openProfilePopup);
document.querySelector('.profile__add-button').addEventListener('click', openPlacePopup);

const popupImage = document.querySelector('.popup_image');
const popupPic = popupImage.querySelector('.popup__pic');
const popupPicCaption = document.querySelector('.popup__pic-caption');

const openImage = (data) => {
  popupPic.src = data.link;
  popupPic.alt = data.name;
  popupPicCaption.textContent = data.name;
  openPopup(popupImage);
  return data;
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

export { avatarPopup, profilePopup, placePopup, renderLoading, closePopup, openImage }