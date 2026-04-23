import { jogo } from "./campojogo.js";


import { jogo } from "./campojogo.js";
const coletar0 = document.getElementById("btn-coletar").disabled = true;

document.getElementById("btn-iniciar").addEventListener('click', () => {

document.getElementById("btn-coletar").disabled = false;


})
const coletar = document.getElementById("btn-coletar").addEventListener("click", () => {

    jogo.encerrarPartida(); 

});

/* 
    aqui vc só precisa chamar o método encerrarPartida() do jogo ao clicar no botão
    não esquece de importar!!!

//document.getElementById("btn-iniciar").disabled = false;
 import { jogo } from "./campojogo.js"; essa importação PRECISA estar no topo do arquivo
// se não funcionar vá em jogo.html e veja se seu script tem type="module" assim como o campojogo.js e multiplicador.js têm. se não tiver, coloque
*/

document.getElementById("btn-coletar").disabled = true;

document.getElementById("btn-iniciar").addEventListener('click', () => {

document.getElementById("btn-coletar").disabled = false;


})

const coletar = document.getElementById("btn-coletar").addEventListener("click", () => {

    jogo.encerrarPartida(); 


});


/* 
aqui vc só precisa chamar o método encerrarPartida() do jogo ao clicar no botão
    não esquece de importar!!!
    
//document.getElementById("btn-iniciar").disabled = false;
import { jogo } from "./campojogo.js"; essa importação PRECISA estar no topo do arquivo
// se não funcionar vá em jogo.html e veja se seu script tem type="module" assim como o campojogo.js e multiplicador.js têm. se não tiver, coloque
*/

