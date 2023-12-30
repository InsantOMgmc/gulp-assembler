burger = document.querySelector('.burger');
body = document.body;
nav = document.querySelector('.header__nav');

burger.addEventListener('click', function () {
    this.classList.toggle('active');
    nav.classList.toggle('open');
    body.classList.toggle('lock');
});


// smooth scrolling
const links = document.querySelectorAll('a[href*="#"]');
links.forEach(function (link) {
    link.addEventListener('click', event => {
        event.preventDefault();

        const blockId = link.getAttribute('href').substring(1);
        if (blockId) {

            document.getElementById(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            nav.classList.toggle('open');
            body.classList.remove('lock');
            burger.classList.toggle('active');
        }
    });

});
