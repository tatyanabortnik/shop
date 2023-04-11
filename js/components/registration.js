import {getUsers, addUser} from '../services/userService.js';
import {showError} from './error.js';

const registrationForm = document.querySelector(`#registrationForm`);

if(registrationForm){
    registrationForm.addEventListener(`submit`, async e=>{
        e.preventDefault();

        let name = e.target.querySelector(`input[data-name="name"]`).value;
        let email = e.target.querySelector(`input[data-name="email"]`).value;
        let password = e.target.querySelector(`input[data-name="password"]`).value;
        let passwordVerify = e.target.querySelector(`input[data-name="passwordVerify"]`).value;

        if(password !== passwordVerify){
            showError(e.target, `Password not matches`);
            return;
        }

        let users = await getUsers();
        let userExist = users.find(user => user.email === email);

        if(userExist){
            showError(e.target, `User with email ${email} already exist`);
            return;
        }

        let user = {
            name: name,
            email: email,
            password: password,
            status: true
        }

        let addedUser = await addUser(user);
        localStorage.setItem(`user`, JSON.stringify(addedUser));
        document.location.href = `/`;
    })
}