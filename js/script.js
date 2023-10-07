const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    preloader.classList.add('hide');
    setTimeout(() => {
        preloader.remove();
    }, 600);
});


const nav = document.querySelector('.nav');
const navItem = document.querySelectorAll('.nav__item');
const navBtn = document.querySelector('.nav__btn');

navBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    navItem.forEach(el => {
        el.addEventListener('click', () => {
            nav.classList.remove('active');
        })
    })
});


