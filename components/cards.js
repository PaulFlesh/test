import { userId } from "./index.js";
import { changeLikeStatus, removeCard, postCard } from "./api.js";
import { openImage, closePopup, placePopup, renderLoading } from "./modal.js";
import { toggleButtonState } from "./validation.js";

const formPlace = document.querySelector('[name="element-creation"]');
const elementsList = document.querySelector('.elements__list');
const placeTemplate = document.querySelector('#element-template').content.querySelector('.element');
const placeTemplateName = document.querySelector('#element-title');
const placeTemplateImage = document.querySelector('#element-image');
const buttonPostPopup = document.querySelector('.form__submit-button_create-element');

const clickButtonDelete = (element) => {
  element.remove();
  element = null;
}

const isLiked = (likesArray, userId) => {
  return Boolean(likesArray.find((likeObj) => {
    return likeObj._id === userId;
  }))
}

const updateLikesState = (cardElement, likesArray, userId) => {
  const placeLike = cardElement.querySelector('.element__like');
  const likeCounter = cardElement.querySelector('.element__like-count');
  likeCounter.textContent = likesArray.length;
  if (isLiked(likesArray, userId)) {
    placeLike.classList.add('element__like_active');
  } else {
    placeLike.classList.remove('element__like_active');
  }
}

const createCard = (dataCard, userId, handleChangeLikeStatus, handleDeleteCard) => {
  const placeElement = placeTemplate.cloneNode(true);
  const placeName = placeElement.querySelector('.element__name');
  const placeImage = placeElement.querySelector('.element__image');
  const placeBin = placeElement.querySelector('.element__bin');
  const placeLike = placeElement.querySelector('.element__like');
  const likeCounter = placeElement.querySelector('.element__like-count');
  placeName.textContent = dataCard.name;
  placeImage.src = dataCard.link;
  placeImage.alt = dataCard.name;
  updateLikesState(placeElement, dataCard.likes, userId);
  if (dataCard.owner._id !== userId) {
    placeBin.remove();
  }
  placeImage.addEventListener('click', () => openImage(dataCard));
  placeBin.addEventListener('click', () => handleDeleteCard(placeElement, dataCard._id));
  placeLike.addEventListener('click', () => {handleChangeLikeStatus(placeElement, dataCard._id, placeLike.classList.contains('element__like_active'))});
  return placeElement;
}

const handleDeleteCard = (placeElement, cardId) => {
  removeCard(cardId)
    .then(() => {
      clickButtonDelete(placeElement);
    })
    .catch(err => console.log(err));
}

const handleChangeLikeStatus = (placeElement, cardId, isLiked) => {
  changeLikeStatus(cardId, isLiked)
    .then((dataFromServer) => {
      updateLikesState(placeElement, dataFromServer.likes, userId);
    })
    .catch(err => console.log(err));
}

const renderCard = (data, container, userId) => {
  const place = createCard(data, userId, handleChangeLikeStatus, handleDeleteCard);
  container.prepend(place);
}

const addPlace = (evt) => {
  evt.preventDefault();
  renderLoading(buttonPostPopup, true);
  postCard({ name: placeTemplateName.value, link: placeTemplateImage.value })
  .then((dataFromServer) => {
    renderCard(dataFromServer, elementsList, userId);
  })
  .then(() => {
    formPlace.reset();
    toggleButtonState(buttonPostPopup, false, 'form__submit-button_disabled');
    closePopup(placePopup);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoading(buttonPostPopup, false);
  });
}
formPlace.addEventListener('submit', addPlace);

export { formPlace, elementsList, placeTemplate, placeTemplateName, placeTemplateImage, createCard, renderCard }