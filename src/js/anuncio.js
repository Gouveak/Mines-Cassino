const anuncio = document.querySelectorAll(".anuncio");
let index = 0;

setInterval(() => {
    anuncio[index].classList.remove("ativo");
    index = (index + 1) % anuncio.length;
    anuncio[index].classList.add("ativo");
}, 3000);