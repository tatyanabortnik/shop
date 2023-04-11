import {getUsers, changeUser} from '../services/userService.js';
import {showError} from './error.js';

const loginForm = document.querySelector(`#loginForm`);

if(loginForm){
    loginForm.addEventListener(`submit`, async e=>{
        e.preventDefault();

        let email = e.target.querySelector(`input[data-name="email"]`).value;
        let password = e.target.querySelector(`input[data-name="password"]`).value;

        let users = await getUsers();
        let userExist = users.find(user => user.email === email);

        if(!userExist){
            showError(e.target, `Invalid email`);
            return;
        }

        if(userExist.password !== password){
            showError(e.target, `Invalid passwod`);
            return;
        }

        userExist.status = true;
        await changeUser(userExist.id, {status: true});
        localStorage.setItem(`user`, JSON.stringify(userExist));
        document.location.href = `/`;
    })
}