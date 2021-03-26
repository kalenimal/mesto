export class Api {
  constructor (config) {
    this._token = config.authorization;
  }
//получает информацию о пользователе с свервера
  getUserInfo() {
     return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
      headers: {
        authorization: this._token
      }
    })

    .then (res => {
      if (res.ok) {
        return res.json()
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
 
  }

//получает данные карточек с сервера
getIntlCards() {
  return fetch ('https://mesto.nomoreparties.co/v1/cohort-21/cards', { 
    headers: {
      authorization: this._token
    }
  }) 

  .then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
} 
//меняет данные пользователя на сервере
changeProf(data) {
  return fetch ('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })

  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

//постит новую карту
postCard(data) {
  return fetch ('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
    method: 'POST',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    })
  })

  .then (res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

// удаляет карту на сервере
deleteCard(id) {
  return fetch (`https://mesto.nomoreparties.co/v1/cohort-21/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: this._token
    }
  })
}

//ставит лайк 
postLike(cardId) {
  return fetch (`https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${cardId}`,
 { method: 'PUT',
headers: {
  authorization: this._token
}
})
.then(res=> {
  return res.json();
})
.then(res=> {
  return res;
})
}

//удаляет лайк
deleteLike (cardId) {
  return fetch (`https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${cardId}`,
  { method: 'DELETE',
 headers: {
   authorization: this._token
 }
 })
}
}
