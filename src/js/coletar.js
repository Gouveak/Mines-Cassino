import { jogo } from "./campojogo.js";

const btnColetar = document.getElementById("btn-coletar");
const telaColetar = document.querySelector(".tela-coletar");
const btnContinuarApostando = telaColetar?.querySelector("button");

function atualizarEstadoBotao() {
  btnColetar.disabled = !jogo.podeColetar;
}

jogo.addEventListener("partidaIniciada", () => {
  atualizarEstadoBotao();
});

btnColetar.addEventListener("click", () => {
  if (!jogo.podeColetar) {
    atualizarEstadoBotao();
    window.alert("Abra pelo menos uma estrela antes de coletar.");
    return;
  }

  jogo.encerrarPartida(true);
});

jogo.addEventListener("partidaEncerrada", (event) => {
  atualizarEstadoBotao();

  if (event.detail?.foiColeta && telaColetar) {
    telaColetar.style.display = "flex";
  }
});

jogo.addEventListener("atualizarMultiplicador", atualizarEstadoBotao);
jogo.addEventListener("partidaRecuperada", atualizarEstadoBotao);

atualizarEstadoBotao();

if (btnContinuarApostando && telaColetar) {
  btnContinuarApostando.addEventListener("click", () => {
    telaColetar.style.display = "none";
  });
}