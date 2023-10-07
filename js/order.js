const cardOrder = document.querySelector('.card-order');
const orderContentList = document.querySelector('.order-content__list');
const orderTotalQuantity = document.querySelector('.order-total__quantity');
const orderTotalPrice = document.querySelector('.order-total__price');
const cardBottomBtn = document.querySelector('.card-bottom__btn');

const orderData = [];

const generateOrder = (img, title, quantity, price) => {
    return `
    <li class="order-content__item">
        <article class="order-content__product order-product">
            <img class="order-product__img" src=${img} alt=${img}>
            <h3 class="order-product__title">${title}</h3>
            <span class="order-product__quantity">Количество: ${quantity} шт</span>
            <span class="order-product__price">${price}</span>
        </article>
    </li>
    `;
}
                    
function updateOrder() {
    let count = 0;
    let fullprice = 0;
    orderContentList.innerHTML = '';
    cardContentList.querySelectorAll('.card-content__item').forEach(el => {
        const cardImg = el.querySelector('.card-product__img').getAttribute('src');
        const cardTitle = el.querySelector('.card-product__title').textContent;
        const cardQuantity = el.querySelector('.card-counter__quantity').textContent;
        const cardPrice = el.querySelector('.card-product__price').textContent;
        
        orderContentList.innerHTML += generateOrder(cardImg, cardTitle, cardQuantity, cardPrice);
        count += priceNumber(cardQuantity)
        fullprice += priceNumber(cardPrice)
        orderData.push(
            {
                title: cardTitle,
                quantity: cardQuantity,
                price: cardPrice
            }
        )
    });
    orderTotalQuantity.textContent = `Товаров в заказе: ${count} шт`;
    orderTotalPrice.textContent = `Общая сумма заказа: ${normalPrice(fullprice)}  ₼`;

}

cardBottomBtn.addEventListener('click', () => {
    updateOrder()
    cardOrder.classList.add('active');
    cardContent.classList.remove('active');
});

document.querySelector('.card-order__close-btn').addEventListener('click', () => {
    cardOrder.classList.remove('active');
});

cardOrder.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let self = e.currentTarget;
    let data = new FormData(self);
    data.append('Товары', JSON.stringify(orderData));
    
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert('Ваш заказ отправлен. Мы скоро с вами свяжемся!');
                cardOrder.classList.remove('active');
            }
        }
    }
    
    xhr.open('POST', 'mail.php', true);
    xhr.send(data);
    
});
