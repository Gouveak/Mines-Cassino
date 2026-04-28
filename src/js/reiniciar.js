import { jogo } from "./campojogo.js";

function reiniciarJogoOculto() {
  const malha = document.getElementById("malha");
  if (malha) malha.innerHTML = "";

  jogo.resetarAtributos();
  localStorage.removeItem("ultimaPartida");
}

const btnSair = document.getElementById("btn-sair");
if (btnSair) {
  btnSair.addEventListener("click", () => {
    reiniciarJogoOculto();
    window.location.href = "index.html";
  });
}

const btnSairTempo = document.getElementById("btn-sair-tempo");
if (btnSairTempo) {
  btnSairTempo.addEventListener("click", () => {
    reiniciarJogoOculto();
    window.location.href = "index.html";
  });
}

const btnSairPerdeu = document.getElementById("btn-sair-perdeu");
if (btnSairPerdeu) {
  btnSairPerdeu.addEventListener("click", () => {
    reiniciarJogoOculto();
    window.location.href = "index.html";
  });
}