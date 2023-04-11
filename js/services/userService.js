const API = `https://634e9f834af5fdff3a625f84.mockapi.io/users`;

export const getUsers = () => fetch(API).then(data => data.json());

export const changeUser = (id, obj) => fetch(API+`/${id}`, {
    method: `PUT`,
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(data => data.json());

export const addUser = (obj) => fetch(API, {
    method: `POST`,
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(data => data.json());

export const deleteUser = id => fetch(API+`/${id}`, {
    method: `DELETE`
}).then(data => data.json());