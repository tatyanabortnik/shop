import USER from './user.js';
import {getProducts} from '../services/productService.js';
import productPrice from './productPrice.js';

const orderTable = document.querySelector(`#orderTable tbody`);

const renderProduct = item => {
    const totalPrice = productPrice(item.price, item.salePercent, item.order);

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
    <td>${item.sale ? `<span class="item__sale">- ${item.salePercent}%</span>` : `-`}</td>
    <td>${item.count}</td>
    <td>$${totalPrice}</td>`;

    orderTable.append(tr);
}

if(orderTable){
    (async () => {
        const products = await getProducts();
        const userProducts = USER.orders
            .reduce((list, item) => {
                let product = products.find(product => product.id == item.id);
                product.count = item.count;
                list.push(product);
                return list;
            },[]);

        userProducts.forEach(item => renderProduct(item));
    })();
}