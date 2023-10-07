const products = document.querySelectorAll('.product');


products.forEach(product => {
    const imageSwitchItem = product.querySelectorAll('.image-switch__item');
    const imagePagination = product.querySelector('.image-pagination');
    if (imageSwitchItem.length > 1) {
        imageSwitchItem.forEach((el, index) => {
            el.setAttribute('data-index', index);
            imagePagination.innerHTML += `<li class="image-pagination__item  ${index === 0 ? 'image-pagination__item--active' : ''}" data-idx=${index}></li>`;

            el.addEventListener('mouseenter', () => {
                product.querySelectorAll('.image-pagination__item').forEach((el, idx) => {
                    if (index === idx) {
                        el.classList.add('image-pagination__item--active')
                    }
                    else {
                        el.classList.remove('image-pagination__item--active')
                    }
                })
            });
            el.addEventListener('mouseleave', () => {
                product.querySelectorAll('.image-pagination__item').forEach((el, idx) => {
                    if (idx === 0) {
                        el.classList.add('image-pagination__item--active')
                    }
                    else {
                        el.classList.remove('image-pagination__item--active')
                    }
                })
            });
        });
    }


    product.addEventListener('click', (e) => {
        const productImage = e.currentTarget.querySelector('.product-image');
        const productTitle = e.currentTarget.querySelector('.product__title a');


        productImage.href = `card-page.html?product_id=${e.currentTarget.dataset.id}`;
        productTitle.href = `card-page.html?product_id=${e.currentTarget.dataset.id}`;

        const productData = [];
        productData.push({
            id: e.currentTarget.dataset.id,
            img: e.currentTarget.querySelector('.image-switch__img img').getAttribute('src').replace('1.jpg', ''),
            title: productTitle.textContent,
            priceCurrent: e.currentTarget.querySelector('.product-price__current').textContent,
            priceOld: e.currentTarget.querySelector('.product-price__old').textContent
        });
        localStorage.setItem('productData', JSON.stringify(productData));
    });
});
