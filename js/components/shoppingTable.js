import USER from './user.js';
import {changeUser} from '../services/userService.js';
import {getProducts} from '../services/productService.js';
import {shoppingCartCount} from './header.js';
import {orderTotal} from './orderSummary.js';
import productPrice from './productPrice.js';

const shoppingCartTable = document.querySelector(`#shoppingCartTable tbody`);

const renderProduct = item => {
    let totalPrice = productPrice(item.price, item.salePercent, item.count);

    let tr = document.createElement(`tr`);
    tr.innerHTML = `<td>
        <div class="item__info">
        <img src="images/products/${item.img}.png" alt="${item.title}" height="100" />
        <div>
            <p class="item__info--title">${item.title}</p>
        </div>
        </div>
    </td>
    <td>$${item.price}</td>
    <td>${item.sale ? `<span class="item__sale">- ${item.salePercent}%</span>` : `-`}</td>`;

    const tdCount = document.createElement(`td`);
    const countInput = document.createElement(`input`);
    countInput.type = `number`;
    countInput.min = 1;
    countInput.value = item.count;
    countInput.addEventListener(`change`, async e => {
        let userProduct = USER.shoppingCart.findIndex(product => product.id == item.id);
        
        USER.shoppingCart[userProduct].count = +e.target.value;
        await changeUser(USER.id, {shoppingCart: USER.shoppingCart});
        localStorage.setItem(`user`, JSON.stringify(USER));

        tdPrice.innerHTML = `$`+productPrice(item.price, item.salePercent, +e.target.value);
        orderTotal();
    })
    tdCount.append(countInput);

    const tdPrice = document.createElement(`td`);
    tdPrice.innerHTML = `$`+totalPrice;

    const tdDelete = document.createElement(`td`);
    const deleteBtn = document.createElement(`button`);
    deleteBtn.className = `item__remove`;
    deleteBtn.innerHTML = `<img src="images/delete.png" alt="delete" height="20" />`;
    deleteBtn.addEventListener(`click`, async () => {
        const productIndex = USER.shoppingCart.findIndex(product => product.id==item.id);
        USER.shoppingCart.splice(productIndex,1);
        await changeUser(USER.id, {shoppingCart: USER.shoppingCart});
        localStorage.setItem(`user`, JSON.stringify(USER));
        tr.remove();

        shoppingCartCount();
        orderTotal();
    })
    tdDelete.append(deleteBtn);

    tr.append(tdCount, tdPrice, tdDelete);

    shoppingCartTable.append(tr);
}

if(shoppingCartTable){
    (async () => {
        const products = await getProducts();
        const userProducts = USER.shoppingCart
            .reduce((list, item) => {
                let product = products.find(product => product.id == item.id);
                product.count = item.count;
                list.push(product);
                return list;
            },[]);

        userProducts.forEach(item => renderProduct(item));
    })();
}