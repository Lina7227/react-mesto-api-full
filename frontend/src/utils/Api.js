class Api{
    constructor({baseUrl}){
        this._baseUrl = baseUrl;
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
            credentials: 'include',
        })
        .then(this.handleResponse)
 
    }
    // сохранение данных пользователя
    setUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
        .then(this.handleResponse)

    }
    
    // отправка нового аватара
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(this.handleResponse)
    }

    // запрос на получение карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleResponse)
            
    }

    // сохранение карточек
    addCard(card){
        return fetch(`${this._baseUrl}/cards`, {
          method:'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            name: card.name,
            link: card.link,
          })
        })
        .then(this.handleResponse)

    }

    // удаление карточек
    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleResponse)
            
    }

    // запрос поставить и удалить лайк с карточки
    changeCardLikeStatus(cardId, likeStatus) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: (likeStatus ? 'PUT' : 'DELETE'),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleResponse)
            
    }


}

const apiConfigg = {
    // baseUrl: 'https://card-mesto.herokuapp.com',
    baseUrl: 'http://localhost:3000',
}

// отправка запросов
const api = new Api(apiConfigg);

export default api;