const nomeInput = document.getElementById("nomeInput");
const saldoEL = document.getElementById("saldoInput");
const btn = document.getElementById("btnSalvarSaldo");

function validarSaldo(saldoInput, valorOriginal) {

    if (valorOriginal === "") {
        return "Por favor, insira o valor de fichas para continuar.";
    }

    if (!Number.isFinite(saldoInput) || !Number.isInteger(saldoInput)) {
        return "Por favor, insira um valor inteiro.";
    }

    if (saldoInput < 10) {
        return "O saldo mínimo permitido é 10 fichas.";
    }

    if (saldoInput % 10 !== 0) {
        return "O saldo deve ser múltiplo de 10 (Ex: 10, 20, 50, 100).";
    }

    return null; 
}

btn.addEventListener("click", function() {

    const nome = nomeInput.value.trim();
    const valorTexto = saldoEL.value;
    const saldo = Number(valorTexto);

    if (nome === "") {
        alert("Digite seu nome para continuar!");
        return;
    }

    const erro = validarSaldo(saldo, valorTexto);
    if (erro) {
        alert(erro);
        return;
    }

    localStorage.setItem("saldoGlobal", saldo);
    localStorage.setItem("scoreInicial", saldo); 
    localStorage.setItem("nomeUsuario", nome);

    window.location.href = "jogo.html";
});