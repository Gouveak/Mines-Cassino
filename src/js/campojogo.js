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

class Jogo extends EventTarget {
  #aposta;
  #saldo;
  #potencial;
  #ganhoTotal = Number(localStorage.getItem("ganhoTotal")) || 0;
  #multiplicador = 1;
  #idBlocosBomba;
  #idClicados = [];
  #venceu = true;
  #blocos = [];

  qtdJogadas = 1;
  qtdPartidas = 1;

  imagens = {
    estrela: "01100101011100110111010001110010.png",
    bomba: "bomb.gif",
  };

  get potencial() {
    return `$ ${this.#aposta * this.#multiplicador}`;
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
    return `$ ${this.#aposta}`;
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
  }

  encerrarPartida() {
    if (this.#venceu) {
      window.alert("Você venceu!");

      this.#saldo += this.#potencial;
      this.#ganhoTotal += this.#potencial;
      this.qtdPartidas += 1;

      localStorage.setItem("saldoGlobal", this.#saldo);
      localStorage.setItem("ganhoTotal", this.#ganhoTotal);
    }

    this.resetarAtributos();

    if (!this.#venceu) {
      window.alert("Você perdeu!");
    }
    this.dispatchEvent(new Event("partidaEncerrada"));
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
    }, 800);
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

      // se o id do bloco é um dos que foram sorteados
      if (isBlocoSorteado) {
        // troca a imagem do verso para a bomba
        verso.style.backgroundImage = `url('src/assets/imagens/${this.imagens["bomba"]}')`;
      } else {
        verso.style.backgroundImage = `url('src/assets/imagens/${this.imagens["estrela"]}')`;
      }

      const blocoObj = new Bloco(blocoEl.dataset.idBloco, isBlocoSorteado);
      this.#blocos.push(blocoObj);
    });
  }

  encontarObjCorrespondente(idElemento) {
    const objCorrespondente = this.#blocos.find(
      (bloco) => bloco.idCorrespondente == idElemento,
    );
    return objCorrespondente;
  }

  revelarBloco(elemento) {
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
    this.qtdJogadas += 1;
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

      // troca a imagem do verso para a estrela
      verso.style.backgroundImage = `url('src/assets/imagens/${this.imagens["estrela"]}')`;

      const isBlocoSorteado = this.#idBlocosBomba.includes(
        Number(blocoEl.dataset.idBloco),
      );

      // se o id do bloco é um dos que foram sorteados
      if (isBlocoSorteado) {
        // troca a imagem do verso para a bomba
        verso.style.backgroundImage = `url('src/assets/imagens/${this.imagens["bomba"]}')`;
      }

      blocoEl.addEventListener(
        "click",
        (e) => {
          this.revelarBloco(blocoEl);
        },
        { once: true },
      );

      malha.appendChild(blocoEl);
      // cria um objeto da classe Bloco com dois atributos: o id do elemento que corresponde a ele no DOM e uma boolean: ele é ou não um dos blocos sorteados com a bomba
      const blocoObj = new Bloco(blocoEl.dataset.idBloco, isBlocoSorteado);

      // adiciona o objeto na lista de blocos do jogo
      this.#blocos.push(blocoObj);
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
    ativarBotoes();
  });

  console.log("clicou");
  jogo.aposta = aposta;
  jogo.saldo = saldo;
  jogo.iniciarPartida();
});
