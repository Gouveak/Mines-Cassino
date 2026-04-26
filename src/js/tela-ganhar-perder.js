import { jogo } from "./campojogo.js";

export const telaPerdeu = document.getElementById("tela-perdeu");
export const telaFimDeJogo = document.getElementById("tela-fim-jogo");
export const btnFecharTela = document.getElementById('fecharTela');


btnFecharTela.addEventListener('click', (() => {
    telaFimDeJogo.style.display = 'none';
    malha.innerHTML = '';
    ativarBotoes();
}))

