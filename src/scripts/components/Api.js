export class Api {
  constructor (config) {
    this._token = config.authorization;
    this._url = config.url;
  }
//получает информацию о пользователе с свервера
  getUserInfo() {
     return fetch(`${this._url}users/me`, {
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
  return fetch (`${this._url}cards`, { 
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
//одновременно получает данные о картах и пользовпателе
getAllData() {
  return Promise.all([this.getUserInfo(), this.getIntlCards()])
}
//меняет данные пользователя на сервере
changeProf(data) {
  return fetch (`${this._url}users/me`, {
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
  return fetch (`${this._url}cards`, {
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
  return fetch (`${this._url}cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: this._token
    }
  })
  .then (res=> {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

//ставит лайк 
postLike(cardId) {
  return fetch (`${this._url}cards/likes/${cardId}`,
 { method: 'PUT',
headers: {
  authorization: this._token
}
})
.then (res=> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})

}

//удаляет лайк
deleteLike (cardId) {
  return fetch (`${this._url}cards/likes/${cardId}`,
  { method: 'DELETE',
 headers: {
   authorization: this._token
 }
 })
 .then (res=> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})

}

//меняет аватар
changeAva(data) {
  return fetch(`${this._url}users/me/avatar`,
  {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: data.link
    })
  })
  .then (res=> {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

}
