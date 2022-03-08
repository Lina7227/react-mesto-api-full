class Auth {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    // возврат ответа сервера об ошибке
    handleResponse = (res) => {
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    register({email, password}) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "password": password,
              "email": email
            }),
        })
        .then(this.handleResponse)
    }

    login({email, password}) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "password": password,
              "email": email
            }),
        })
        .then(this.handleResponse);
    }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
        })
        .then(this.handleResponse);
    }
}

const authConfigg = {
    baseUrl: 'https://auth.nomoreparties.co',
}

const auth = new Auth(authConfigg);

export default auth;