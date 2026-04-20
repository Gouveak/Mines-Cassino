const saldoEL = document.getElementById("saldoInput"); // const referente ao input

function validarSaldo(saldoInput) { // função que retorna uma mensagem caso o valor inserido seja não finito, não inteiro, ou menor que 10
  if (!Number.isFinite(saldoInput) || !Number.isInteger(saldoInput) || saldoInput < 10) return "Informe o valor de fichas corretamente.";
  return null;
}

document.getElementById("btnSalvarSaldo").addEventListener("click", () => { // evento referente ao botão, onde definimos que, caso a função de validação seja satisfeita, a mensagem seja exibida em um alert
  const saldo = Number(saldoEL.value);

  const erro = validarSaldo(saldo);
  if (erro) {
    alert(erro);
    return;
  }

  localStorage.setItem("saldoGlobal", saldo); // o saldo é armazenado no navegador para que possa ser acessado pela outra página
  window.location.href = "jogo.html"; // o usuário é direcionado para a página do mines

});

