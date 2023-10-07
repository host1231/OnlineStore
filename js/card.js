const productBtns = document.querySelectorAll('.product__btn');
const card = document.querySelector('.card');
const cardQuantity = document.querySelector('.card__quantity');
const cardContentList = document.querySelector('.card-content__list');
const cardFullPrice = document.querySelector('.card-bottom__fullprice');
const cardContent = document.querySelector('.card-content');

let price = 0;

const priceNumber = (str) => {
    return parseInt(str.replace(/\s/g, ''));
}

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

const plusPrice = (currentPrice) => {
    return price += currentPrice;
}

const minusPrice = (currentPrice) => {
    return price -= currentPrice;
}

const printQuantity = () => {
    const cardContentItems = cardContentList.querySelectorAll('.card-content__item');
    if (cardContentItems.length) {
        card.classList.add('active');
    }
    else {
        card.classList.remove('active');
    }
    cardQuantity.textContent = cardContentItems.length;
}


const printFullPrice = () => {
    cardFullPrice.textContent = `${normalPrice(price)} ₼`;
}

const generateCard = (id, img, title, price) => {
    return `
    <li class="card-content__item">
        <article class="card-content__product card-product" data-id=${id}>
            <img class="card-product__img" src=${img} alt="">
            <h3 class="card-product__title">${title}</h3>
            <span class="card-product__price">${price}</span>
            <div class="card-product__counter card-counter">
                <button class="card-counter__btn-minus">-</button>
                <div class="card-counter__quantity">1</div>
                <button class="card-counter__btn-plus">+</button>
            </div>
            <button class="card-product__trash-btn">
                <img src="images/trash-solid.svg" alt="Trash">
            </button>
        </article>
    </li> `
}


const deleteCard = () => {
    const cardTrashBtn = document.querySelectorAll('.card-product__trash-btn');
    cardTrashBtn.forEach(el => {
        el.addEventListener('click', (e) => {
            const cardContentItem = e.target.closest('.card-content__item');
            const cardContentProductId = cardContentItem.querySelector('.card-content__product').dataset.id;

            try {
                const productBtn = document.querySelector(`.product[data-id="${cardContentProductId}"]`).querySelector('.product__btn');
                productBtn.disabled = false;
                productBtn.innerHTML = `<img src="images/basket-btn.svg" alt="">Добавить в корзину`;
                
            } catch (error) {
                cardPageProductBtn.disabled = false;
                cardPageProductBtn.innerHTML = `<img src="images/basket-btn.svg" alt="">Добавить в корзину`;
            }
            
            const cardProductPrice = cardContentItem.querySelector('.card-product__price').textContent;
            cardContentItem.remove();
            printQuantity();
            minusPrice(priceNumber(cardProductPrice));
            printFullPrice();
            setLocStr();
            updateDisabledBtn()
        });
    });
}

productBtns.forEach((el, idx) => {
    el.closest('.product').setAttribute('data-id', idx + 1);
    el.addEventListener('click', (e) => {
        const productBtn = e.target;
        const product = productBtn.closest('.product');
        const productId = product.dataset.id;
        const productImg = product.querySelector('.image-switch__img img').getAttribute('src');
        const productTitle = product.querySelector('.product__title').textContent;
        const productPrice = product.querySelector('.product-price__current').textContent;
    
        productBtn.disabled = true;
        productBtn.innerHTML = `<img src="images/basket-btn.svg" alt="">Добавлен в корзину`;
    
        cardContentList.insertAdjacentHTML('afterbegin', generateCard(productId, productImg, productTitle, productPrice));
        printQuantity();
        plusPrice(priceNumber(productPrice));
        printFullPrice();
        deleteCard();
        setLocStr();
        window.location.reload();
    });
});

const printUpdatePrice = () => {
    cardContentList.querySelectorAll('.card-content__item').forEach(el => {
        const counterQuantity = el.querySelector('.card-counter__quantity');
        const cardProductPrice = el.querySelector('.card-product__price');
        const cardPrice = priceNumber(cardProductPrice.textContent) / priceNumber(counterQuantity.textContent);
        el.addEventListener('click', (e) => {
            console.log(e.target.classList.contains('card-counter__btn-plus'));
            if (e.target.classList.contains('card-counter__btn-plus')) {
                counterQuantity.textContent = ++counterQuantity.textContent;
                cardProductPrice.textContent = `${normalPrice(counterQuantity.textContent * cardPrice)} ₼`;
                plusPrice(cardPrice);
                printFullPrice();
                setLocStr();
            }
            if (e.target.classList.contains('card-counter__btn-minus')) {
                if (counterQuantity.textContent > 1) {
                    counterQuantity.textContent = --counterQuantity.textContent;
                    cardProductPrice.textContent = `${normalPrice(counterQuantity.textContent * cardPrice)} ₼`;
                    minusPrice(cardPrice);
                    printFullPrice();
                    setLocStr();
                }
            }
        })
    })
}


document.querySelector('.card-content__close-btn').addEventListener('click', () => {
    cardContent.classList.remove('active');

});

document.querySelector('.card__text').addEventListener('click', () => {
    cardContent.classList.add('active');
});


const setLocStr = () => {
    localStorage.setItem('data', cardContentList.innerHTML);
}

const getLocStr = () => {
    cardContentList.innerHTML = localStorage.getItem('data');
    cardContentList.querySelectorAll('.card-product__price').forEach(el => {
        plusPrice(priceNumber(el.textContent));
        printFullPrice();
    });
    cardContentList.querySelectorAll('.card-content__product').forEach(el => {
        const id = el.dataset.id;
        try {
            const productBtn = document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn');
            productBtn.disabled = true;
            productBtn.innerHTML = `<img src="images/basket-btn.svg" alt="">Добавлен в корзину`;

        } catch (error) {
            console.log(error.message);
        }
    });
    printQuantity();
    printUpdatePrice();
    deleteCard();
}

getLocStr();
