import { jogo } from "./campojogo.js";

const caixaSaldoEl = document.getElementById("saldoCaixa"); // const correspondente ao h2 com o saldo
let saldoAtual = Number(localStorage.getItem("saldoGlobal")); // let resgata o saldo do input (no primeiro uso); caso o usuário feche ou recarregue a aba sem querer, o valor para saldo será mantido. Para apagar, deve-se pressionar o botão sair
function atualizarInterfaceSaldo() {
  saldoAtual = Number(localStorage.getItem("saldoGlobal"));
  
  if (caixaSaldoEl) {
    // o saldo armazenado como variável global substituirá o texto inicial do h2
    if (saldoAtual) {
      caixaSaldoEl.innerHTML = `$ ${saldoAtual}`;
    } else {
      caixaSaldoEl.innerHTML = `$ 0`;
    }
  }
}

const caixaApostaEl = document.getElementById("apostaCaixa"); // const correspondnete ao h2 com a aposta
let valorAposta = Number(localStorage.getItem("totalAposta")); // let resgata a variável correspondente ao valor da aposta, definida mais adiante

if (caixaApostaEl) {
  // o valor da aposta é imprimido; caso o usuário feche ou recarregue a aba sem querer, o valor será mantido
  caixaApostaEl.innerHTML = `$ ${valorAposta}`;
}

function apostar(valorFicha) {
  // caso o saldo seja suficiente, o valor da ficha será acumulado em aposta, e descontado de saldo
  saldoAtual = Number(localStorage.getItem("saldoGlobal"));
  if (saldoAtual >= valorFicha) {
    valorAposta += valorFicha;
    saldoAtual -= valorFicha;

    caixaApostaEl.innerHTML = `$ ${valorAposta}`;
    caixaSaldoEl.innerHTML = `$ ${saldoAtual}`;

    localStorage.setItem("saldoGlobal", saldoAtual); // valor atualizado do saldo
    localStorage.setItem("totalAposta", valorAposta); // valor da aposta como variável global
  } else {
    alert("Saldo insuficiente.");
    return;
  }
}

// uso da função apostar utilizando os valores das fichas correspondentes como parâmetro (valorFicha)
document.getElementById("btn-apostar-dez").addEventListener("click", () => {
  apostar(10);
});

document
  .getElementById("btn-apostar-cinquenta")
  .addEventListener("click", () => {
    apostar(50);
  });

document.getElementById("btn-apostar-cem").addEventListener("click", () => {
  apostar(100);
});

function atualizarInterfaceAposta() {
  // exibe o valor de aposta atualizado de campojogo.js, definido pelo dev Giovanni. Quando o jogo é finalizado, a aposta será sempre zerada

  caixaApostaEl.innerHTML = jogo.aposta; // pega o valor atualizado de aposta (de campojogo.js)
  valorAposta = 0; // estabelece o mesmo valor para a var local para evitar conflitos
}

jogo.addEventListener("atualizarAposta", atualizarInterfaceAposta); // quando o jogo executar atualizarAposta em resetarAtributos(), a função acima será chamada, exibindo o valor corretamente
jogo.addEventListener("partidaEncerrada", atualizarInterfaceSaldo);
jogo.addEventListener("partidaRecuperada", atualizarInterfaceSaldo);
