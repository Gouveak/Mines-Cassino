import { jogo } from "./campojogo.js";

const displayTemporizador = document.querySelector(".caixa-temporizador h2");

let intervalo = null;
let segundosRestantes = 180;

function formatarTempo(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const seg = String(segundos % 60).padStart(2, "0");
  return `${min}:${seg}`;
}

function salvarTempo() {
  localStorage.setItem("temporizadorFim", Date.now() + segundosRestantes * 1000);
}

function recuperarTempo() {
  const fim = Number(localStorage.getItem("temporizadorFim"));
  if (!fim) return null;
  const restante = Math.round((fim - Date.now()) / 1000);
  return restante > 0 ? restante : 0;
}

function tick() {
  segundosRestantes--;
  salvarTempo();
  displayTemporizador.innerHTML = formatarTempo(segundosRestantes);

  if (segundosRestantes <= 30) {
    displayTemporizador.style.color = "#ff4444";
    displayTemporizador.style.textShadow = "0 0 5px #ff0000, 0 0 15px #ff0000, 0 0 30px #ff000088";
  }

  if (segundosRestantes <= 0) {
    clearInterval(intervalo);
    localStorage.removeItem("temporizadorFim");
  }
}

function iniciarTemporizador() {
  segundosRestantes = 180;
  salvarTempo();
  displayTemporizador.innerHTML = formatarTempo(segundosRestantes);
  displayTemporizador.style.color = "";
  displayTemporizador.style.textShadow = "";

  clearInterval(intervalo);
  intervalo = setInterval(tick, 1000);
}

function pararTemporizador() {
  clearInterval(intervalo);
  segundosRestantes = 180;
  localStorage.removeItem("temporizadorFim");
  displayTemporizador.innerHTML = "03:00";
  displayTemporizador.style.color = "";
  displayTemporizador.style.textShadow = "";
}

// ao carregar a página, verifica se havia um temporizador rodando
const tempoSalvo = recuperarTempo();
if (tempoSalvo !== null && tempoSalvo > 0) {
  segundosRestantes = tempoSalvo;
  displayTemporizador.innerHTML = formatarTempo(segundosRestantes);

  if (segundosRestantes <= 30) {
    displayTemporizador.style.color = "#ff4444";
    displayTemporizador.style.textShadow = "0 0 5px #ff0000, 0 0 15px #ff0000, 0 0 30px #ff000088";
  }

  intervalo = setInterval(tick, 1000);
}

document.getElementById("btn-iniciar").addEventListener("click", () => {
  iniciarTemporizador();
});

jogo.addEventListener("partidaEncerrada", () => {
  pararTemporizador();
});