const nomeInput = document.getElementById("nomeInput");
const saldoEL = document.getElementById("saldoInput");
const btn = document.getElementById("btnSalvarSaldo");


nomeInput.addEventListener("input", () => {
    nomeInput.value = nomeInput.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
});


function validarSaldo(saldoInput, valorOriginal) {

    if (valorOriginal.trim() === "") {
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


btn.addEventListener("click", function () {
    const nome = nomeInput.value.trim();
    const valorTexto = saldoEL.value;
    const saldo = Number(valorTexto);

    if (nome === "") {
        alert("Digite seu nome para continuar!");
        return;
    }

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!nomeValido.test(nome)) {
        alert("Digite apenas letras no nome!");
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

    fetch("salvar_mines.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `nome=${nome}&saldo=${saldo}`
    })
        .then(response => response.text())
        .then(data => {
            if (data === "ok") {
                window.location.href = "jogo.html";
            } else {
                alert("Erro ao salvar!");
                window.location.href = "jogo.html";
            }
        });

});