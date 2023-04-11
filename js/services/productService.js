const API = `https://634e9f834af5fdff3a625f84.mockapi.io/products`;

export const getProducts = () => fetch(API).then(data => data.json());