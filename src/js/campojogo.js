// eventos criados para manter os valores da interface atualizados: atualizarMultiplicador e atualizarAposta
/*  exemplo de uso
import { jogo } from "./campojogo.js";
  const apostaValor = document.getElementById("multiplicador");
  function definirAposta() {
  apostaValor.innerHTML = `${jogo.aposta}`;
}

// o código abaixo chama a função definirAposta() toda vez que o jogo emite o evento atualizarAposta
jogo.addEventListener("atualizarAposta", definirAposta);

*/
import { telaFimDeJogo, telaPerdeu } from "./tela-ganhar-perder.js";

class Jogo extends EventTarget {
  #aposta;
  #saldo = Number(localStorage.getItem("saldoGlobal"));
  #potencial;
  #ganhoTotal = Number(localStorage.getItem("ganhoTotal")) || 0;
  #multiplicador = 1;
  #idBlocosBomba;
  #idClicados = [];
  #venceu = true;
  #blocos = [];

  qtdJogadas = 0;

  imagens = {
    estrela: "01100101011100110111010001110010.png",
    bomba: "bomb.gif",
  };

  get potencial() {
    const aposta = Number(this.#aposta) || 0;
    return `$ ${aposta * this.#multiplicador}`;
  }

  get multiplicador() {
    return `${this.#multiplicador.toFixed(1)}x`;
  }
  get idClicados() {
    return this.#idClicados;
  }

  get idBlocosBomba() {
    return this.#idBlocosBomba;
  }
  get aposta() {
    const aposta = Number(this.#aposta) || 0;
    console.log("aposta: " + aposta);
    return `$ ${aposta}`;
  }

  set aposta(valor) {
    this.#aposta = Number(valor);
  }

  set saldo(valor) {
    this.#saldo = Number(valor);
  }

  aumentarMultiplicador() {
    this.#multiplicador += 1;
    console.log(`Multiplicador: ${this.#multiplicador}`);
    this.dispatchEvent(new Event("atualizarMultiplicador"));
  }

  resetarAtributos() {
    this.#aposta = 0;
    localStorage.setItem("totalAposta", this.#aposta);
    this.dispatchEvent(new Event("atualizarAposta"));
    this.#multiplicador = 1;
    this.dispatchEvent(new Event("atualizarMultiplicador"));
    this.#blocos = [];
    this.#idBlocosBomba = [];
    this.#idClicados = [];
    this.#venceu = true;
  }
  armazenarPartida() {
    localStorage.setItem("saldoGlobal", this.#saldo);
    if (this.#blocos.length === 0) {
      return;
    }
    const partida = {
      saldo: this.#saldo,
      aposta: this.#aposta,
      multiplicador: this.#multiplicador,
      idBlocosClicados: this.#idClicados,
      idBlocosBomba: this.#idBlocosBomba,
      qtdJogadas: this.qtdJogadas,
    };

    const partidaJSON = JSON.stringify(partida);
    localStorage.setItem("ultimaPartida", partidaJSON);
  }

  recuperarPartida() {
    const ultimaPartida = localStorage.getItem("ultimaPartida");
    if (!ultimaPartida) {
      return;
    }

    const partida = JSON.parse(ultimaPartida);
    console.log(partida);
    const { saldo, aposta, multiplicador, idBlocosClicados, idBlocosBomba, qtdJogadas } =
      partida;
    if (!idBlocosBomba) {
      return;
    }

    console.log("há uma partida armazenada");
    this.#saldo = saldo;
    this.#aposta = aposta;
    this.#multiplicador = multiplicador;
    this.#idClicados = idBlocosClicados;
    this.#idBlocosBomba = idBlocosBomba;
    console.log(this.#idBlocosBomba);
    this.qtdJogadas = qtdJogadas;

    for (let i = 0; i < 25; i++) {
      const blocoEl = document.createElement("div");
      blocoEl.classList.add("bloco");

      // define o id dos blocos
      blocoEl.dataset.idBloco = i + 1;

      this.adicionarFrenteVerso(blocoEl); // adiciona os elementos de frente e verso do bloco;
      const verso = blocoEl.querySelector("div.verso"); // seleciona o verso do bloco

      const isBlocoSorteado = this.#idBlocosBomba.includes(
        Number(blocoEl.dataset.idBloco),
      );

      this.#definirImagemVerso(verso, isBlocoSorteado);

      if (!this.#idClicados.includes(Number(blocoEl.dataset.idBloco))) {
        blocoEl.addEventListener(
          "click",
          (e) => {
            this.revelarBloco(blocoEl);
          },
          { once: true },
        );
      } else {
        blocoEl.classList.add("rotacionado");
      }
      this.#registrarBloco(blocoEl.dataset.idBloco, isBlocoSorteado);
      malha.appendChild(blocoEl);
    }
    console.log(
      "(partida recuperada) id dos blocos com a bomba: " + this.#idBlocosBomba,
    );
    console.log(this.#blocos);
    btnColetar.disabled = false;
    desativarBotoes();
    this.dispatchEvent(new Event("partidaRecuperada"));
  }
  encerrarPartida() {
    localStorage.removeItem("ultimaPartida");
    console.log("a ultima partida foi deletada");
    this.saldo = localStorage.getItem("saldoGlobal");
    btnColetar.disabled = true;
    const potencial = Number(this.#aposta) * this.#multiplicador;
    const saldoFinal = this.#saldo + (this.#venceu ? potencial : 0);

    // aqui eu calculo o saldo final que vai ser salvo
    // isso é importante porque é esse valor que depois vai aparecer no Excel

    // aqui eu salvo os dados da partida
    // esses dados vão para o localStorage e depois são usados para gerar o arquivo CSV
    // que é o arquivo que será aberto no Excel
    // estou salvando:
    // - quantidade de jogadas (rodadas)
    // - saldo final da partida
    salvarPartida(this.qtdJogadas, saldoFinal);

    if (this.#venceu) {
      window.alert("Você venceu!");

      this.#saldo += potencial;
      this.#ganhoTotal += potencial;
      this.qtdPartidas += 1;

      localStorage.setItem("saldoGlobal", this.#saldo);
      localStorage.setItem("ganhoTotal", this.#ganhoTotal);
    }

    if (!this.#venceu && saldoFinal === 0) {
      telaPerdeu.style.display = "flex";
    }

    if (!this.#venceu && saldoFinal != 0) {
      telaFimDeJogo.style.display = "flex";
    }

    this.resetarAtributos();

    this.dispatchEvent(new Event("partidaEncerrada"));
    console.log('partida encerrada')
  }
  adicionarFrenteVerso(blocoEl) {
    const frente = document.createElement("div");
    frente.classList.add("frente");

    const verso = document.createElement("div");
    verso.classList.add("verso");

    blocoEl.appendChild(frente);
    blocoEl.appendChild(verso);
  }

  // sorteia 8 numeros aleatorios e guarda eles na propriedade idBlocosBomba
  sortearBlocosBomba(numeroNaoPermitido) {
    let numeros = [];

    while (numeros.length < 8) {
      const numeroAleatorio = Math.floor(Math.random() * 25) + 1; // gera um número aleatório entre 1 e 25;
      if (
        !this.#idClicados.includes(numeroAleatorio) &&
        numeroAleatorio !== numeroNaoPermitido &&
        !numeros.includes(numeroAleatorio)
      ) {
        numeros.push(numeroAleatorio);
        console.log(numeros);
      }
    }
    numeros.sort((a, b) => a - b);
    this.#idBlocosBomba = numeros;
    if (numeroNaoPermitido) {
      console.log("os novos numeros são: " + this.#idBlocosBomba);
    }
  }

  revelarTudo() {
    const todosElBlocos = malha.querySelectorAll(".bloco");
    todosElBlocos.forEach((elBloco) => {
      elBloco.classList.add("rotacionado");
    });
  }

  perdeu() {
    this.#venceu = false;
    this.revelarTudo(malha);
    setTimeout(() => {
      this.encerrarPartida();
    }, 1200);
  }
  #definirImagemVerso(verso, isBlocoSorteado) {
    const imagem = isBlocoSorteado
      ? this.imagens["bomba"]
      : this.imagens["estrela"];
    verso.style.backgroundImage = `url('src/assets/imagens/${imagem}')`;
  }

  #registrarBloco(idBloco, isBlocoSorteado) {
    const blocoObj = new Bloco(idBloco, isBlocoSorteado);
    this.#blocos.push(blocoObj);
  }
  manipular(idElemento) {
    console.log("O usuário clicou na bomba cedo demais, manipulando...");
    this.#idBlocosBomba = [];
    this.#blocos = [];
    this.sortearBlocosBomba(idElemento);
    const blocosEl = malha.querySelectorAll(".bloco");
    blocosEl.forEach((blocoEl) => {
      const verso = blocoEl.querySelector(".verso");
      console.log("imagem do verso mudou");

      const isBlocoSorteado = this.#idBlocosBomba.includes(
        Number(blocoEl.dataset.idBloco),
      );

      this.#definirImagemVerso(verso, isBlocoSorteado);
      this.#registrarBloco(blocoEl.dataset.idBloco, isBlocoSorteado);
    });
  }

  encontarObjCorrespondente(idElemento) {
    const objCorrespondente = this.#blocos.find(
      (bloco) => bloco.idCorrespondente == idElemento,
    );
    return objCorrespondente;
  }

  revelarBloco(elemento) {
    this.qtdJogadas += 1;
    console.log("Quantidade de jogadas : " + this.qtdJogadas);

    const idElemento = elemento.dataset.idBloco;
    console.log(idElemento);

    const objCorrespondente = this.encontarObjCorrespondente(idElemento);
    this.#idClicados.push(Number(idElemento));
    console.log(`Elemento tem estrela: ${objCorrespondente.temEstrela}`);

    if (objCorrespondente.temEstrela) {
      this.aumentarMultiplicador();
      elemento.classList.add("rotacionado");
      return;
    }

    console.log("não tem estrela");
    if (!objCorrespondente.temEstrela && this.qtdJogadas < 3) {
      console.log("vai manipular");
      this.manipular(Number(idElemento));
      this.aumentarMultiplicador();
    } else {
      this.perdeu();
    }

    elemento.classList.add("rotacionado");
  }

  iniciarPartida() {
    this.sortearBlocosBomba();
    this.dispatchEvent(new Event("partidaIniciada"));

    // cria 25 blocos
    for (let i = 0; i < 25; i++) {
      const blocoEl = document.createElement("div");
      blocoEl.classList.add("bloco");

      // define o id dos blocos
      blocoEl.dataset.idBloco = i + 1;

      this.adicionarFrenteVerso(blocoEl); // adiciona os elementos de frente e verso do bloco;
      const verso = blocoEl.querySelector("div.verso"); // seleciona o verso do bloco

      const isBlocoSorteado = this.#idBlocosBomba.includes(
        Number(blocoEl.dataset.idBloco),
      );

      this.#definirImagemVerso(verso, isBlocoSorteado);

      blocoEl.addEventListener(
        "click",
        (e) => {
          this.revelarBloco(blocoEl);
        },
        { once: true },
      );

      malha.appendChild(blocoEl);

      this.#registrarBloco(blocoEl.dataset.idBloco, isBlocoSorteado);
    }

    console.log(`Aposta: ${this.#aposta}`);
    console.log(`Saldo:${this.#saldo}`);
    console.log(`Multiplicador: ${this.#multiplicador}`);
    console.log(`id dos blocos sorteados com a bomba: ${this.#idBlocosBomba}`);
  }
}

class Bloco {
  #idCorrespondente;
  #temEstrela;

  constructor(idCorrespondente, temBomba) {
    this.#idCorrespondente = idCorrespondente;
    this.#temEstrela = !temBomba;
  }

  get idCorrespondente() {
    return this.#idCorrespondente;
  }

  get temEstrela() {
    return this.#temEstrela;
  }
}

const malha = document.getElementById("malha");
const btnIniciar = document.getElementById("btn-iniciar");
const btnColetar = document.getElementById("btn-coletar");
const btnApostarDez = document.getElementById("btn-apostar-dez");
const btnApostarCinquenta = document.getElementById("btn-apostar-cinquenta");
const btnApostarCem = document.getElementById("btn-apostar-cem");

function ativarBotoes() {
  btnIniciar.disabled = false;
  btnApostarDez.disabled = false;
  btnApostarCinquenta.disabled = false;
  btnApostarCem.disabled = false;
}

function desativarBotoes() {
  btnIniciar.disabled = true;
  btnApostarDez.disabled = true;
  btnApostarCinquenta.disabled = true;
  btnApostarCem.disabled = true;
}

// exporta o jogo para os atributos serem usados em outros arquivos
export const jogo = new Jogo();
btnIniciar.addEventListener("click", () => {
  desativarBotoes();

  const aposta = Number(localStorage.getItem("totalAposta"));
  const saldo = localStorage.getItem("saldoGlobal");

  if (aposta < 10 || aposta % 10 !== 0) {
    window.alert("Você deve apostar um valor válido.");
    ativarBotoes();
    return;
  }

  jogo.addEventListener("partidaEncerrada", () => {
    malha.innerHTML = "";
    console.log('malha esvaziada');
    ativarBotoes();
  });
  console.log("clicou");
  jogo.aposta = aposta;
  jogo.saldo = saldo;
  jogo.iniciarPartida();
});

window.addEventListener("beforeunload", () => {
  jogo.armazenarPartida();
});
window.addEventListener("DOMContentLoaded", () => {
  jogo.recuperarPartida();
});
