class Jogo {
  #aposta;
  #saldo;
  #potencial;
  #ganhoTotal = 0;
  #multiplicador = 0;
  #idBlocosBomba;
  #venceu = false;

  encerrarPartida() {
    if (this.#venceu) {
      this.#saldo += this.#potencial;
    }
    this.#aposta = 0;
    this.#multiplicador = 0;
    btnIniciar.disabled = false;
    return;
  }

  get potencial() {
    return this.#aposta * this.#multiplicador;
  }

  constructor(aposta, saldo) {
    this.#aposta = aposta;
    this.#saldo = saldo;
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
  // sorteia 8 numeros aleatorios e guarda eles na propreidade idBlocosBomba
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
  revelarBloco(e) {
    console.log(e.dataset.idBloco);
    e.classList.add("rotacionado");
  }
  iniciarPartida(malha) {
    this.sortearBlocosBomba();

    for (let i = 0; i < 25; i++) {
      const blocoEl = document.createElement("div");
      blocoEl.classList.add("bloco");

      // enumera o bloco
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
    }

    console.log(`Aposta: ${this.#aposta}`);
    console.log(`Saldo:${this.#saldo}`);
    console.log(`Multiplicador: ${this.#multiplicador}`);
    console.log(`id dos blocos sorteados com a bomba: ${this.#idBlocosBomba}`);
  }
}

const malha = document.getElementById("malha");
const btnIniciar = document.getElementById("btn-iniciar");

btnIniciar.addEventListener("click", () => {
  btnIniciar.disabled = true;
  const aposta = localStorage.getItem("totalAposta");
  const saldo = localStorage.getItem("saldoGlobal");
  console.log("clicou");
  const jogo = new Jogo(aposta, saldo);
  jogo.iniciarPartida(malha);
});
