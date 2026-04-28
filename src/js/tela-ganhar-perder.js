import { jogo } from "./campojogo.js";

export const telaPerdeu = document.getElementById("tela-perdeu");
export const telaFimDeJogo = document.getElementById("tela-fim-jogo");
export const btnFecharTela = document.getElementById('fecharTela');


btnFecharTela.addEventListener('click', (() => {
    telaFimDeJogo.style.display = 'none';
    malha.innerHTML = '';
    ativarBotoes();
}))
export function mostrarTelaPerdeu() {
    telaPerdeu.style.display = "flex"; // ou "block", depende do teu CSS
}
