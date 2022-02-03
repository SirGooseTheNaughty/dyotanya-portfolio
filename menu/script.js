const burger = document.querySelector('#rec407703783');
const burgerLinks = burger.querySelectorAll('a');
const trigger = document.querySelector('.burger-trigger');

trigger.addEventListener('click', toggleBurger);
burgerLinks.forEach(link => link.addEventListener('click', toggleBurger));
burger.classList.add('burger');
setTimeout(() => burger.classList.add('transition'));

function toggleBurger() {
    if (burger.classList.contains('shown')) {
        burger.classList.remove('shown');
        trigger.classList.remove('opened');
        document.body.classList.remove('burger-opened');
    } else {
        burger.classList.add('shown');
        trigger.classList.add('opened');
        document.body.classList.add('burger-opened');
    }
}