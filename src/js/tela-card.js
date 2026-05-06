import { jogo } from "./campojogo.js";

const telaCard = document.querySelector(".tela-card");
const btnRecompensa = document.getElementById("recompensaCaixa");
const saldoEl = document.getElementById("saldoCaixa");

let partidaAtiva = false;

function animarNumero(elemento, valorAntigo, valorNovo, prefixo = "$ ") {
  const duracao = 400;
  const inicio = performance.now();

  function atualizar(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const easeOut = 1 - Math.pow(1 - progresso, 3);
    const valorAtual = Math.round(valorAntigo + (valorNovo - valorAntigo) * easeOut);

    elemento.innerHTML = `${prefixo}${valorAtual}`;

    if (progresso < 1) {
      requestAnimationFrame(atualizar);
    }
  }

  requestAnimationFrame(atualizar);
}

jogo.addEventListener("partidaIniciada", () => {
  partidaAtiva = true;
});
jogo.addEventListener("partidaEncerrada", () => {
  partidaAtiva = false;
});

jogo.addEventListener("blocoClicado", () => {

  setTimeout(() => {

    if (!partidaAtiva) return;

    if (jogo.idClicados.length === 5) {
      telaCard.style.display = "flex";
    }

  }, 10);

});
btnRecompensa.addEventListener("click", () => {

  let saldoAntigo = Number(localStorage.getItem("saldoGlobal")) || 0;
  let saldoNovo = saldoAntigo + 20;

  localStorage.setItem("saldoGlobal", saldoNovo);

  if (saldoEl) {
    animarNumero(saldoEl, saldoAntigo, saldoNovo);
  }

  telaCard.style.display = "none";

});