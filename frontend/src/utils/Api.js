class Api{
    constructor({baseUrl, token}){
        this._baseUrl = baseUrl;
        this._token = token;
    }

    // возврат ответа сервера об ошибке
    handleResponse = (res) => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    } 

    // запрос о получении информации о пользователе
    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this.handleResponse)
 
    }
    // сохранение данных пользователя
    setUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${data.name}`,
                about: `${data.about}`,
            })
        })
        .then(this.handleResponse)

    }
    
    // отправка нового аватара
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(this.handleResponse)
    }

    // запрос на получение карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleResponse)
            
    }

    // сохранение карточек
    addCard(data){
        return fetch(`${this._baseUrl}/cards`, {
          method:'POST',
          headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: `${data.name}`,
            link: `${data.link}`,
          })
        })
        .then(this.handleResponse)

    }

    // удаление карточек
    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleResponse)
            
    }

    // запрос поставить и удалить лайк с карточки
    changeCardLikeStatus(cardId, likeStatus) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: (likeStatus ? 'PUT' : 'DELETE'),
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleResponse)
            
    }


}

const apiConfigg = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
    token: '15dc4595-bdc3-4503-bc80-ce15dbc42c36'
}

// отправка запросов
const api = new Api(apiConfigg);

export default api;