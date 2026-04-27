import { jogo } from "./campojogo.js";

const caixaChanceEl = document.getElementById("chanceCaixa"); // const referente ao h2 que exibe a chance de obter estrela

function atualizarChance() { // function que irá atualizar o valor exibido para chance de ganhar através de cálculos a partir de elementos de campojogo.js 
  const totalBlocos = 25; // a malha é de 5x5
  const totalBombas = jogo.idBlocosBomba.length; // pega a largura do array idBlocosBomba
  const totalClicados = jogo.idClicados.length; // pega a largura do array idClicados

  if (totalBombas === 0) { // garante que o valor exibido seja 0% antes do jogo começar
    caixaChanceEl.innerHTML = `0%`;
    return;
  }

  // cálculos realizados a partir das consts anteriores
  const blocosRestantes = totalBlocos - totalClicados;
  const totalEstrelas = totalBlocos - totalBombas;
  const estrelasRestantes = totalEstrelas - totalClicados;

  if (blocosRestantes <= 0) { // proteção extra caso a lógica do jogo mude no futuro
    caixaChanceEl.innerHTML = "0%";
    return;
  }

  let chanceVerdadeira = (estrelasRestantes / blocosRestantes) * 100; // chance real de obter estrela no próximo clique
  const bonus = 5;
  let chanceManipulada = Math.min(99, chanceVerdadeira + bonus); // chance manipulada = menor valor entre 99 e a chance verdadeira mais bônus de 5 (nunca 100%)

  caixaChanceEl.innerHTML = `${Math.floor(chanceManipulada)}%`; // h2 atualizado com a chance manipulada
}

function zerarChance() { // função que zera a chance e exibe o valor atualizado
  let chanceManipulada = 0
  caixaChanceEl.innerHTML = `${chanceManipulada}%`;
}

jogo.addEventListener("partidaIniciada", atualizarChance); // quando campojogo.js chamar o evento partidaIniciada, o valor é exibido
jogo.addEventListener("atualizarMultiplicador", atualizarChance); // quando campojogo.js chamar atualizarMultiplicador(), o valor é exibido
jogo.addEventListener("partidaEncerrada", zerarChance); // quando campojogo.js chamar o evento partidaEncerrada, o valor é zerado