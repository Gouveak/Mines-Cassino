import { jogo } from "./campojogo.js";

export const telaPerdeu = document.getElementById("tela-perdeu");
export const telaFimDeJogo = document.getElementById("tela-fim-jogo");
export const telaTempoEsgotado = document.querySelector(".tela-tempo-esgotado");
export const telaSaldoInsuficiente = document.querySelector(".tela-saldo-insuficiente");

export const btnFecharTela = document.getElementById("fecharTela");

const malha = document.getElementById("malha");

let jogoEncerrado = false;

if (btnFecharTela) {
  btnFecharTela.addEventListener("click", () => {

    if (telaFimDeJogo) telaFimDeJogo.style.display = "none";
    if (telaPerdeu) telaPerdeu.style.display = "none";
    if (telaTempoEsgotado) telaTempoEsgotado.style.display = "none";
    if (telaSaldoInsuficiente) telaSaldoInsuficiente.style.display = "none";

    jogoEncerrado = false;

    if (malha) malha.innerHTML = "";

    if (typeof ativarBotoes === "function") {
      ativarBotoes();
    }
  });
}

export function mostrarTelaPerdeu(motivo = "mina") {

  if (jogoEncerrado) return;

  jogoEncerrado = true;

  if (motivo === "tempo" && telaTempoEsgotado) {
    telaTempoEsgotado.style.display = "flex";
    return;
  }

  if (motivo === "saldo" && telaSaldoInsuficiente) {
    telaSaldoInsuficiente.style.display = "flex";
    return;
  }

  if (motivo === "mina" && telaPerdeu) {
    telaPerdeu.style.display = "flex";
  }
}