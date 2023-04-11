import USER from "./user.js";
import { changeUser } from "../services/userService.js";
import { getProducts } from "../services/productService.js";
import { shoppingCartCount } from "./header.js";
import productPrice from './productPrice.js';

const categoriesContainer = document.querySelector(`#categoriesContainer`);

const renderCategories = (categories) => {
  categories.forEach((cat) => {
    let section = document.createElement(`section`);
    section.className = `category`;
    section.dataset.name = cat;
    section.innerHTML = ` <h2>${cat}</h2>
        <div class="category__container"></div>`;

    categoriesContainer.append(section);
  });
};

const renderProduct = (product) => {
  const productBlock = document.createElement(`div`);
  productBlock.className = `product`;

  let productSale = ``;
  if (product.sale) {
    productSale = `<div class="product__sale">
            <span class="product__sale--old">$${product.price}</span>
            <span class="product__sale--percent">-${product.salePercent}%</span>
        </div>`;
  }

  let price = productPrice(product.price, product.salePercent);

  productBlock.innerHTML = `<img
        src="images/products/${product.img}.png"
        class="product__img"
        alt="${product.title}"
        height="80"
    />
    <p class="product__title">${product.title}</p>
    ${productSale}
    <div class="product__info">
        <span class="product__price">$${price}</span>
        <a 
            href="login.html" 
            class="product__cart"
            data-id="${product.id}"
        >
            <img
            src="images/shopping-cart.png"
            alt="shopping cart"
            height="20"
        />
        </a>
    </div>`;

  const catBlock = categoriesContainer.querySelector(
    `section[data-name="${product.category}"] .category__container`
  );
  catBlock.append(productBlock);
};

const renderUserProducts = () => {
    let btns = document.querySelectorAll(`.product__cart`);
    btns.forEach(btn => {
        let productId = btn.dataset.id;

        let userProductIndex = USER.shoppingCart.findIndex(product => product.id == productId);
        if(userProductIndex>-1) btn.classList.add(`product__cart--in`);

        btn.addEventListener(`click`, async e=>{
            e.preventDefault();

            userProductIndex = USER.shoppingCart.findIndex(product => product.id == productId);
    
            if(userProductIndex===-1){
                USER.shoppingCart.push({id: productId, count: 1});
                btn.classList.add(`product__cart--in`);
            } else{
                USER.shoppingCart.splice(userProductIndex,1);
                btn.classList.remove(`product__cart--in`);
            }

            shoppingCartCount(USER.shoppingCart.length);
    
            await changeUser(USER.id, {shoppingCart: USER.shoppingCart});
            localStorage.setItem(`user`, JSON.stringify(USER));
        })
    })
}

if (categoriesContainer) {
  (async () => {
    let products = await getProducts();
    let categories = products.reduce((catList, item) => {
      if (catList.indexOf(item.category) === -1) catList.push(item.category);
      return catList;
    }, []);

    renderCategories(categories);
    products.forEach((product) => renderProduct(product));

    USER && renderUserProducts();
  })();
}
