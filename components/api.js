const config = {
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
  headers: {
    authorization: 'eeb10f4c-568d-4124-bc82-28113d2b839d',
    'Content-Type': 'application/json',
  },
};

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(response);
};

function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

function getInitialCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

function editProfile(data) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

function editAvatar(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

function getAllInfo() {
  return Promise.all([getInitialCards(), getUserInfo()])
}

function postCard(data) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

function removeCard(dataId) {
  return fetch(`${config.url}/cards/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function likeCard(dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

function unlikeCard(dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

function changeLikeStatus(dataId, isLike) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: isLike ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export { getUserInfo, getInitialCards, editProfile, editAvatar, getAllInfo, postCard, removeCard, likeCard, unlikeCard, changeLikeStatus }