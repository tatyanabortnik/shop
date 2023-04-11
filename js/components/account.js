import USER from './user.js';
import {deleteUser} from '../services/userService.js';

const userInfoName = document.querySelector(`#userInfoName`);
const userInfoEmail = document.querySelector(`#userInfoEmail`);
const deleteAcc = document.querySelector(`#deleteAcc`);

const removeUser = async () => {
    await deleteUser(USER.id);
    localStorage.removeItem(`user`);
    document.location.href = `/`;
}

if(userInfoName){
    userInfoName.innerHTML = USER.name;
    userInfoEmail.innerHTML = USER.email;

    deleteAcc.addEventListener(`click`, removeUser);
}