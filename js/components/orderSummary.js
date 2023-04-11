const orderSummary = document.querySelector(`#orderSummary`);
const orderSummaryTotal = document.querySelector(`#orderSummaryTotal`);
import USER from './user.js';
import {getProducts} from '../services/productService.js';
import {changeUser} from '../services/userService.js';
import productPrice from './productPrice.js';

export const orderTotal = async () => {
    const products = await getProducts();
    const userProducts = USER.shoppingCart
        .reduce((list, item) => {
            let product = products.find(product => product.id == item.id);
            product.count = item.count;
            list.push(product);
            return list;
        },[]);

    const finalPrice = userProducts.reduce((price, item) => {
        const finalPrice = productPrice(item.price, item.salePercent, item.count);
        return price + finalPrice;
    }, 0);

    orderSummaryTotal.innerHTML = `$${finalPrice}`;
}

if(orderSummary) {
    orderTotal();

    orderSummary.addEventListener(`submit`, async e=>{
        e.preventDefault();

        USER.orders = USER.orders.concat(USER.shoppingCart);
        USER.shoppingCart = [];

        await changeUser(USER.id, USER);
        localStorage.setItem(`user`, JSON.stringify(USER));
        document.location.href = `account.html`;
    })
}