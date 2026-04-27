import { jogo } from "./campojogo.js";

const potencialValor = document.getElementById("idPotencial");

function definirPotencial() {
  potencialValor.innerHTML = jogo.potencial;
}

jogo.addEventListener("atualizarMultiplicador", definirPotencial);
jogo.addEventListener("partidaEncerrada", definirPotencial);
jogo.addEventListener("partidaRecuperada", definirPotencial);

definirPotencial();
