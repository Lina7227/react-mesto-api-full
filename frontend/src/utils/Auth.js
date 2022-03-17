export const BASE_URL  = 'https://api.lina.front.nomoredomains.work';
// export const BASE_URL  = 'http://localhost:3000';

// возврат ответа сервера об ошибке
const handleResponse = (res) => {
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        }),
    })
    .then(response => handleResponse(response));
}

export const login = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Accept": "application/json", 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        }),
    })
    .then(response => handleResponse(response));
}

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Accept": "application/json", 
        "Content-Type": "application/json",
      },
  })
  .then(response => handleResponse(response));
}


export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    })
    .then(response => handleResponse(response));
}
