document.body.addEventListener('touchmove', (e) => {
    if (document.body.classList.contains('burger-opened') || document.body.classList.contains('steps-opened')) {
        e.preventDefault();
        e.stopPropagation();
    }
});
document.querySelector('.burger').addEventListener('touchmove', (e) => {
    e.preventDefault();
    e.stopPropagation();
});
document.querySelector('.steps-block').addEventListener('touchmove', (e) => {
    e.preventDefault();
    e.stopPropagation();
});