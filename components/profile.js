import { closePopup, avatarPopup, profilePopup } from "./modal.js";
import { toggleButtonState } from "./validation.js";
import { renderLoading } from "./utils.js";
import { editProfile, editAvatar } from "./api.js";

const formAvatar = document.querySelector('[name="avatar-info"]');
const avatarInput = document.querySelector('[name="profile-avatar"]');
const avatarOnPage = document.querySelector('.profile__avatar-icon');
const buttonAvatarPopup = document.querySelector('.form__submit-button_edit-avatar');
const buttonNamePopup = document.querySelector('.form__submit-button_edit-profile');

const formProfile = document.querySelector('[name="profile-info"]');
const nameInput = document.querySelector('[name="profile-title"]');
const jobInput = document.querySelector('[name="profile-subtitle"]');
const profileName = document.querySelector('.profile__title');
const profession = document.querySelector('.profile__subtitle');

function submitAvatarForm (evt) {
  evt.preventDefault();
  renderLoading(buttonAvatarPopup, true);
  editAvatar({ avatar: avatarInput.value })
  .then(() => {
    avatarOnPage.src = avatarInput.value;
    toggleButtonState(buttonAvatarPopup, false, 'form__submit-button_disabled');
    closePopup(avatarPopup);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(buttonAvatarPopup, false);
  });
}
formAvatar.addEventListener('submit', submitAvatarForm); 

function submitProfileForm (evt) {
  evt.preventDefault();
  renderLoading(buttonNamePopup, true);
  editProfile({ name: nameInput.value, about: jobInput.value })
  .then(() => {
    profileName.textContent = nameInput.value;
    profession.textContent = jobInput.value;
    toggleButtonState(buttonNamePopup, false, 'form__submit-button_disabled');
    closePopup(profilePopup);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(buttonNamePopup, false);
  });
}
formProfile.addEventListener('submit', submitProfileForm);

export { formAvatar, avatarInput, avatarOnPage, formProfile, nameInput, jobInput, profileName, profession }