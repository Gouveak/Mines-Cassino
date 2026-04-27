import { jogo } from "./campojogo.js";

const multiplicadorValor = document.getElementById("multiplicador");
function definirMultiplicador() {
  multiplicadorValor.innerHTML = jogo.multiplicador;
}

jogo.addEventListener("atualizarMultiplicador", definirMultiplicador);
jogo.addEventListener("partidaRecuperada", definirMultiplicador);

// se estiver tentando importar jogo no seu arquivo js e não funcionar, vá em jogo.html e veja se seu script tem type="module".
