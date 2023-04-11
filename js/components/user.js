const USER = localStorage.getItem(`user`) ? JSON.parse(localStorage.getItem(`user`)) : null;
export default USER;