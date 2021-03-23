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
    .then ((res) => {
      const prflData = {};
      prflData.name = res.name
       prflData.info = res.about
       prflData.avatar = res.avatar
       return prflData;
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
//меняет данные пользователя нас сервр
changeProf(data) {
  return fetch ('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: data.name,
      about: data.info
    })
  })
}
}