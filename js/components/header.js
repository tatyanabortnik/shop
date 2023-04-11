import USER from './user.js';
import {changeUser} from '../services/userService.js';

const headerUser = document.querySelector(`#headerUser`);
const headerShoppingCart = document.querySelector(`#headerShoppingCart`);
const headerShoppingCartCount = document.querySelector(`#headerShoppingCartCount`);
const headerLogout = document.querySelector(`#headerLogout`);

const logoutUser = async () => {
    await changeUser(USER.id, {status: false});
    localStorage.removeItem(`user`);
    document.location.href = `/`;
}

export const shoppingCartCount = () => headerShoppingCartCount.innerHTML = USER.shoppingCart.length;

if(USER){
    headerUser.href = `account.html`;
    headerUser.innerHTML = USER.name;

    headerShoppingCart.href = `shoppingCart.html`;
    headerShoppingCartCount.innerHTML = shoppingCartCount();

    headerLogout.classList.add(`active`);
    headerLogout.addEventListener(`click`, logoutUser);
}