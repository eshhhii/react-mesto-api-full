export const BASE_URL = "https://api.eshhhii.nomoredomains.monster";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка! ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error("Не все поля заполнены");
      } else if (res.status === 401) {
        throw new Error("Email не зарегистрирован");
      } else return res.json();
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", data.token);
        return res;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
