import { jogo } from "./campojogo.js";

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

const caixaSaldoEl = document.getElementById("saldoCaixa");
let saldoAtual = Number(localStorage.getItem("saldoGlobal"));

if (caixaSaldoEl) {
  animarNumero(caixaSaldoEl, 0, saldoAtual);
}

const caixaApostaEl = document.getElementById("apostaCaixa");
let valorAposta = Number(localStorage.getItem("totalAposta"));

if (caixaApostaEl) {
  animarNumero(caixaApostaEl, 0, valorAposta);
}

function apostar(valorFicha) {
  if (saldoAtual >= valorFicha) {
    const saldoAnterior = saldoAtual;
    const apostaAnterior = valorAposta;

    valorAposta += valorFicha;
    saldoAtual -= valorFicha;

    animarNumero(caixaApostaEl, apostaAnterior, valorAposta);
    animarNumero(caixaSaldoEl, saldoAnterior, saldoAtual);
    localStorage.setItem("saldoGlobal", saldoAtual);
    localStorage.setItem("totalAposta", valorAposta);
  } else {
    alert("Saldo insuficiente.");
  }
}

function atualizarInterfaceAposta() {
  animarNumero(caixaApostaEl, valorAposta, Number(jogo.aposta.replace("$ ", "")));
  valorAposta = 0;
}

document.getElementById("btn-apostar-dez").addEventListener("click", () => apostar(10));
document.getElementById("btn-apostar-cinquenta").addEventListener("click", () => apostar(50));
document.getElementById("btn-apostar-cem").addEventListener("click", () => apostar(100));

jogo.addEventListener("atualizarAposta", atualizarInterfaceAposta);

const multiplicadorValor = document.getElementById("multiplicador");
const caixaMultiplicador = document.querySelector(".caixa-multiplicador");

let multiplicadorAnterior = 1;

function definirMultiplicador() {
  const valorNovo = parseFloat(jogo.multiplicador);
  multiplicadorValor.innerHTML = jogo.multiplicador;

  if (valorNovo > multiplicadorAnterior) {
    caixaMultiplicador.classList.remove("fogo-ativo");
    void caixaMultiplicador.offsetWidth;
    caixaMultiplicador.classList.add("fogo-ativo");

    const posicoes = [
      { left: "20%", delay: "0s" },
      { left: "50%", delay: "0.1s" },
      { left: "80%", delay: "0.2s" },
    ];

    posicoes.forEach(({ left, delay }) => {
      const gif = document.createElement("img");
      gif.src = "src/assets/imagens/confete.gif";
      gif.classList.add("gif-confete");
      gif.style.left = left;
      gif.style.animationDelay = delay;
      document.body.appendChild(gif);
      setTimeout(() => gif.remove(), 1500);
    });
  }

  multiplicadorAnterior = valorNovo;
}

jogo.addEventListener("atualizarMultiplicador", definirMultiplicador);