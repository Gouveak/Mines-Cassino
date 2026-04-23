<<<<<<< HEAD
import { jogo } from "./campojogo.js";
=======

import { jogo } from "./campojogo.js";

const potencialValor = document.getElementById("idPotencial");

function definirPotencial() {
    potencialValor.innerHTML = jogo.potencial;
}

jogo.addEventListener("atualizarMultiplicador", definirPotencial);


>>>>>>> 149b2aada2909d55ae0e9b99e5db7afd5d96d625
// aqui vc pode reaproveitar a lógica do multiplicador.js

// exemplo

// const potencialValor = document.getElementById("idPotencial");

/* function definirPotencial() {
 potencialValor.innerHTML = ${jogo.potencial};
}

// depois

jogo.addEventListener("atualizarMultiplicador", definirPotencial);

// não tem problema em usar o evento atualizarMultiplicador aqui. sempre que o valor do multiplicador muda, o  do potencial também muda, não precisei criar um evento só para detectar as mudanças no valor do potencial.
*/

// import { jogo } from "./campojogo.js"; essa importação PRECISA estar no topo do arquivo
// se não funcionar vá em jogo.html e veja se seu script tem type="module" assim como o campojogo.js e multiplicador.js têm. se não tiver, coloque



const potencialValor = document.getElementById("idPotencial");

function definirPotencial() {
    potencialValor.innerHTML = jogo.potencial;
}

jogo.addEventListener("atualizarMultiplicador", definirPotencial);