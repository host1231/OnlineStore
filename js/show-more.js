const showMoreBtn = document.querySelector('.show-more');

let maxAmount = 6;

function showMore() {
    products.forEach((product, idx) => {
        product.style.display = 'none';
        if (idx < maxAmount) {
            product.style.display = 'block';
        }
    });

    if (maxAmount >= products.length){
        showMoreBtn.style.display = 'none';
    }
}

showMore()

showMoreBtn.addEventListener('click', () => {
    maxAmount += 3;
    showMore();
})