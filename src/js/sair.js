import { jogo } from "./campojogo.js";

function reiniciarJogoOculto() {
  const malha = document.getElementById("malha");

  if (malha) {
    malha.innerHTML = "";
  }

  jogo.resetarAtributos();
  localStorage.removeItem("ultimaPartida");
}

// botão sair do header
const btnSair = document.getElementById("btn-sair");

if (btnSair) {
  btnSair.addEventListener("click", () => {
    reiniciarJogoOculto();
  });
}

// botão sair da tela de tempo
const btnSairTempo = document.getElementById("btn-sair-tempo");

if (btnSairTempo) {
  btnSairTempo.addEventListener("click", () => {
    reiniciarJogoOculto();
  });
}const btnSairPerdeu = document.getElementById("btn-sair-perdeu");

if (btnSairPerdeu) {
  btnSairPerdeu.addEventListener("click", reiniciarJogoOculto);
}