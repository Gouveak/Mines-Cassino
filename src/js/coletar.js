import { jogo } from "./campojogo.js";

const btnColetar = document.getElementById("btn-coletar");
const telaColetar = document.querySelector(".tela-coletar");
const btnContinuarApostando = telaColetar?.querySelector("button");

btnColetar.disabled = true;

jogo.addEventListener("partidaIniciada", () => {
  btnColetar.disabled = false;
});

btnColetar.addEventListener("click", () => {
  jogo.encerrarPartida(true);
});

jogo.addEventListener("partidaEncerrada", (event) => {
  btnColetar.disabled = true;

  if (event.detail?.foiColeta && telaColetar) {
    telaColetar.style.display = "flex";
  }
});

if (btnContinuarApostando && telaColetar) {
  btnContinuarApostando.addEventListener("click", () => {
    telaColetar.style.display = "none";
  });
}

