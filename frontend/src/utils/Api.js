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
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: {
                'authorization':`Bearer ${token}`,
            },
        })
        .then(this.handleResponse)
 
    }
    // сохранение данных пользователя
    setUser(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
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
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(this.handleResponse)
    }

    // запрос на получение карточек
    getInitialCards() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleResponse)
            
    }

    // сохранение карточек
    addCard(data){
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards`, {
          method:'POST',
          credentials: 'include',
          headers: {
            'authorization':`Bearer ${token}`,
            'Content-Type': 'application/json',
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
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleResponse)
            
    }

    // запрос поставить и удалить лайк с карточки
    changeCardLikeStatus(cardId, likeStatus) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: (likeStatus ? 'PUT' : 'DELETE'),
            credentials: 'include',
            headers: {
                'authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this.handleResponse)
            
    }


}

const apiConfigg = {
    // baseUrl: 'https://api.lina.front.nomoredomains.work',
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
}

// отправка запросов
const api = new Api(apiConfigg);

export default api;