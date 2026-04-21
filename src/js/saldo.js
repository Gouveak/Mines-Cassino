const saldoEL = document.getElementById("saldoInput"); // const referente ao input

function validarSaldo(saldoInput, valorOriginal) { // função que retorna uma mensagem caso o valor inserido seja não finito, não inteiro, menor que 10 ou não múltiplo de 10 ou o campo do input esteja vazio
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

document.getElementById("btnSalvarSaldo").addEventListener("click", () => { // evento referente ao botão, onde definimos que, caso a função de validação seja satisfeita, a mensagem seja exibida em um alert
  const valorTexto = saldoEL.value;
  const saldo = Number(saldoEL.value);

  const erro = validarSaldo(saldo, valorTexto);
  if (erro) {
    alert(erro);
    return;
  }

  localStorage.setItem("saldoGlobal", saldo); // o saldo é armazenado no navegador para que possa ser acessado pela outra página
  window.location.href = "jogo.html"; // o usuário é direcionado para a página do mines

});

