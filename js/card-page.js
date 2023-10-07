const productViewInner = document.querySelector('.product-view__inner');
const productData = JSON.parse(localStorage.getItem('productData'));


const generateCardPage = () => {
    return `
    <div class="product-view__slider product-slider">
        <div class="product-slider__nav slider-nav">
            <div class="slider-nav__item">
                <img src=${productData[0].img + 1}.jpg alt="${productData[0].img + 1}">
            </div>
            <div class="slider-nav__item">
                <img src=${productData[0].img + 2}.jpg alt=${productData[0].img + 2}>
            </div>
            <div class="slider-nav__item">
                <img src=${productData[0].img + 3}.jpg alt=${productData[0].img + 3}>
            </div>
            <div class="slider-nav__item">
                <img src=${productData[0].img + 4}.jpg alt=${productData[0].img + 4}>
            </div>
            <div class="slider-nav__item">
                <img src=${productData[0].img + 5}.jpg alt=${productData[0].img + 5}>
            </div>
        </div>
        <div class="product-slider__block slider-block">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src=${productData[0].img + 1}.jpg alt=${productData[0].img + 1}>
                </div>
                <div class="swiper-slide">
                    <img src=${productData[0].img + 2}.jpg alt=${productData[0].img + 2}>
                </div>
                <div class="swiper-slide">
                    <img src=${productData[0].img + 3}.jpg alt=${productData[0].img + 3}>
                </div>
                <div class="swiper-slide">
                    <img src=${productData[0].img + 4}.jpg alt=${productData[0].img + 4}>
                </div>
                <div class="swiper-slide">
                    <img src=${productData[0].img + 5}.jpg alt=${productData[0].img + 5}>
                </div>
            </div>
        </div>
    </div>
    <div class="product-view__info product-info">
        <h1 class="product-info__title">${productData[0].title}</h1>
        <p class="product-info__text">Официальная гарантия. Возврат и обмен - согласно статье 15 Закона
        Азербайджанской Республики "О защите прав потребителей".</p>
        <div class="product-info__content info-content">
            <div class="info-content__price info-price">
                <span class="info-price__old">${productData[0].priceOld}</span>
                <span class="info-price__current">${productData[0].priceCurrent}</span>
            </div>
            <button class="info-content__product-btn product__btn btn">
                <img src="images/basket-btn.svg" alt="">
                Добавить в корзину
            </button>
        </div>
    </div>
    `;
}

productViewInner.innerHTML = generateCardPage();

let mySwiper = new Swiper('.slider-block', {
    slidesPerView: 1,
});

const sliderNavItems = document.querySelectorAll('.slider-nav__item');

sliderNavItems.forEach((el, idx) => {
    el.dataset.idx = idx;
    el.addEventListener('click', (e) => {
        mySwiper.slideTo(e.currentTarget.dataset.idx);
    });
});


const cardPageProductBtn = document.querySelector('.product__btn');

function updateDisabledBtn() {
    cardContentList.querySelectorAll('.card-content__product').forEach(el => {
        if (el.dataset.id == productData[0].id) {
            cardPageProductBtn.disabled = true;
            cardPageProductBtn.innerHTML = `<img src="images/basket-btn.svg" alt="">Добавлен в корзину`;
        }
    });
}

updateDisabledBtn()

cardPageProductBtn.addEventListener('click', () => {
    cardContentList.insertAdjacentHTML('afterbegin', generateCard(productData[0].id, `${productData[0].img + 1}.jpg`, productData[0].title, productData[0].priceCurrent));
    updateDisabledBtn();
    printQuantity();
    printUpdatePrice();
    plusPrice(priceNumber(productData[0].priceCurrent))
    printFullPrice();
    deleteCard();
    setLocStr();
    window.location.reload();
});



