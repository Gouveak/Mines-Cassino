// eventos criados para manter os valores da interface atualizados: atualizarMultiplicador e atualizarAposta
/*  exemplo de uso
import { jogo } from "./campojogo.js";
  const multiplicadorValor = document.getElementById("multiplicador");
  function definirMultiplicador() {
  multiplicadorValor.innerHTML = `${jogo.multiplicador}.0x`;
}
// o código abaixo chama a função definirMultiplicador() toda vez que o jogo emite o evento atualizarMultiplicador
jogo.addEventListener("atualizarMultiplicador", definirMultiplicador);

*/

class Jogo extends EventTarget {
  #aposta;
  #saldo;
  #potencial;
  #ganhoTotal;
  #multiplicador = 1;
  #idBlocosBomba;
  #venceu = true;
  #blocos = [];

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
  }

  encerrarPartida(malha) {
    if (this.#venceu) {
      window.alert("Você venceu!");
      this.#saldo += this.#potencial;
      this.#ganhoTotal += this.#potencial;
      localStorage.setItem("saldoGlobal", this.#saldo);
      localStorage.setItem("ganhoTotal", this.#ganhoTotal);
    }

    this.resetarAtributos();
    if (!this.#venceu) {
      window.alert("Você perdeu!");
    }
    malha.innerHTML = "";
    btnIniciar.disabled = false;
  }

  get potencial() {
    return `$ ${this.#aposta * this.#multiplicador}`;
  }

  get multiplicador() {
    return `${this.#multiplicador.toFixed(1)}x`;
  }

  set aposta(valor) {
    this.#aposta = Number(valor);
  }

  set saldo(valor) {
    this.#saldo = Number(valor);
  }

  imagens = {
    estrela: "01100101011100110111010001110010.png",
    bomba: "01100010011011110110110101100010.png",
  };

  adicionarFrenteVerso(blocoEl) {
    const frente = document.createElement("div");
    frente.classList.add("frente");

    const verso = document.createElement("div");
    verso.classList.add("verso");

    blocoEl.appendChild(frente);
    blocoEl.appendChild(verso);
  }
  // sorteia 8 numeros aleatorios e guarda eles na propriedade idBlocosBomba
  sortearBlocosBomba() {
    let numeros = [];
    while (numeros.length < 8) {
      const numeroAleatorio = Math.floor(Math.random() * 25) + 1; // gera um número aleatório entre 1 e 25;
      if (!numeros.includes(numeroAleatorio)) {
        numeros.push(numeroAleatorio);
      }
    }
    numeros.sort((a, b) => a - b);
    this.#idBlocosBomba = numeros;
  }

  async revelarBloco(elemento) {
    const idElemento = elemento.dataset.idBloco;
    console.log(idElemento);
    elemento.classList.add("rotacionado");
    const objCorrespondente = this.#blocos.find(
      (bloco) => bloco.idCorrespondente == idElemento,
    );
    console.log(`Elemento tem estrela: ${objCorrespondente.temEstrela}`);
    if (objCorrespondente.temEstrela) {
      this.aumentarMultiplicador();
    } else {
      this.#venceu = false;
      const todosElBlocos = malha.querySelectorAll(".bloco");
      todosElBlocos.forEach((elBloco) => {
        elBloco.classList.add("rotacionado");
      });
      setTimeout(() => {
        this.encerrarPartida(malha);
      }, 800);
    }
  }

  iniciarPartida(malha) {
    this.sortearBlocosBomba();

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
// exporta o jogo para os atributos serem usados em outros arquivos
export const jogo = new Jogo();
btnIniciar.addEventListener("click", () => {
  btnIniciar.disabled = true;
  const aposta = localStorage.getItem("totalAposta");
  const saldo = localStorage.getItem("saldoGlobal");
  console.log("clicou");
  jogo.aposta = aposta;
  jogo.saldo = saldo;
  jogo.iniciarPartida(malha);
});
