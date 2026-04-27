import { jogo } from "./campojogo.js";

const animacoes = new Map();

function animarNumero(elemento, valorAntigo, valorNovo, prefixo = "$ ") {
  if (animacoes.has(elemento)) {
    cancelAnimationFrame(animacoes.get(elemento));
  }

  const duracao = 400;
  const inicio = performance.now();

  function atualizar(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const easeOut = 1 - Math.pow(1 - progresso, 3);
    const valorAtual = Math.round(valorAntigo + (valorNovo - valorAntigo) * easeOut);
    elemento.innerHTML = `${prefixo}${valorAtual}`;

    if (progresso < 1) {
      animacoes.set(elemento, requestAnimationFrame(atualizar));
    } else {
      animacoes.delete(elemento);
    }
  }

  animacoes.set(elemento, requestAnimationFrame(atualizar));
}

const caixaSaldoEl = document.getElementById("saldoCaixa");
const caixaApostaEl = document.getElementById("apostaCaixa");
let saldoAtual = 0;
let valorAposta = 0;

function lerNumeroStorage(chave) {
  const valor = Number(localStorage.getItem(chave));
  return Number.isFinite(valor) ? valor : 0;
}

function sincronizarValores() {
  saldoAtual = lerNumeroStorage("saldoGlobal");
  valorAposta = lerNumeroStorage("totalAposta");
}

sincronizarValores();

if (caixaSaldoEl) {
  animarNumero(caixaSaldoEl, 0, saldoAtual);
}

if (caixaApostaEl) {
  animarNumero(caixaApostaEl, 0, valorAposta);
}

function apostar(valorFicha) {
  sincronizarValores();

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

function atualizarInterfaceSaldo() {
  const novoSaldo = lerNumeroStorage("saldoGlobal");
  animarNumero(caixaSaldoEl, saldoAtual, novoSaldo);
  saldoAtual = novoSaldo;
}

function atualizarInterfaceAposta() {
  const novaAposta = lerNumeroStorage("totalAposta");
  animarNumero(caixaApostaEl, valorAposta, novaAposta);
  valorAposta = novaAposta;
}

document.getElementById("btn-apostar-dez").addEventListener("click", () => apostar(10));
document.getElementById("btn-apostar-cinquenta").addEventListener("click", () => apostar(50));
document.getElementById("btn-apostar-cem").addEventListener("click", () => apostar(100));

jogo.addEventListener("atualizarAposta", atualizarInterfaceAposta);
jogo.addEventListener("partidaEncerrada", atualizarInterfaceSaldo);
jogo.addEventListener("partidaRecuperada", atualizarInterfaceSaldo);

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
      gif.src = "src/assets/imagens/confete.webp";
      gif.classList.add("webp-confete");
      gif.style.left = left;
      gif.style.animationDelay = delay;

      document.body.appendChild(gif);

      setTimeout(() => gif.remove(), 1500);
    });
  }

  multiplicadorAnterior = valorNovo;
}

jogo.addEventListener("atualizarMultiplicador", definirMultiplicador);
