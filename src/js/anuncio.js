const anuncio = document.querySelectorAll(".anuncio");
let index = 0;

setInterval(() => {
    anuncio[index].classList.remove("ativo");
    index = (index + 1) % anuncio.length;
    anuncio[index].classList.add("ativo");
}, 3000);
const formulario = document.querySelector('.formulario-dois');
const rect = formulario.getBoundingClientRect();
const largura = rect.width;
const altura = rect.height;
const raioCantos = 12;
const tamBolinha = 12;
const espacamento = 30;
