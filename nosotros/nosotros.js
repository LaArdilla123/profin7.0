let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

const sr = ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});
sr.reveal('.hero-text', {delay:200, origin:'top'});
sr.reveal('.new-img', {delay:450, origin:'top'});
sr.reveal('.iconos', {delay:500, origin:'left'});
sr.reveal('.scroll-down', {delay:550, origin:'right'});
sr.reveal('.texto-debut', {delay:400, origin:'top'});
sr.reveal('.musica-youtube', {delay:500, origin:'top'});
sr.reveal('.tarjeta', {delay:400, origin:'left'});
sr.reveal('.texto-tienda', {delay:400, origin:'right'});
