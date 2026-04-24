import { jogo } from "./campojogo.js";

const btnColetar = document.getElementById("btn-coletar");

btnColetar.disabled = true;

jogo.addEventListener("partidaIniciada", () => {
  btnColetar.disabled = false;
});

btnColetar.addEventListener("click", () => {
  jogo.encerrarPartida();
});

jogo.addEventListener("partidaEncerrada", () => {
  btnColetar.disabled = true;
});


