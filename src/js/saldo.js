
const nomeInput = document.getElementById("nomeInput");
const tipoUsuario = document.getElementById("tipoUsuario");
const serieInput = document.getElementById("serieInput");
const saldoEL = document.getElementById("saldoInput");
const btn = document.getElementById("btnSalvarSaldo");



const cursos = {
    ADM: ["1º ADM", "2º ADM", "3º ADM"],
    DS: ["1º DS", "2º DS", "3º DS"],
    LOG: ["1º LOG", "2º LOG", "3º LOG"],
    RH: ["1º RH", "2º RH", "3º RH"]
};



tipoUsuario.addEventListener("change", function() {

    const tipo = this.value;

    
    serieInput.innerHTML = '<option value="">Selecione sua série</option>';

    
    if (tipo === "visitante" || tipo === "") {
        serieInput.style.display = "none"; 
        return;
    }

    
    cursos[tipo].forEach(serie => {
        const option = document.createElement("option");
        option.value = serie;
        option.textContent = serie;
        serieInput.appendChild(option);
    });

    
    serieInput.style.display = "block";
});



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
    const tipo = tipoUsuario.value;
    const serie = serieInput.value;
    const valorTexto = saldoEL.value;
    const saldo = Number(valorTexto);

    // tem que digitar o nome né amigão
    if (nome === "") {
        alert("Digite seu nome para continuar!");
        return;
    }

    
    if (tipo === "") {
        alert("Selecione seu curso!");
        return;
    }

    
    if (tipo !== "visitante" && serie === "") {
        alert("Selecione sua série!");
        return;
    }

    
    const erro = validarSaldo(saldo, valorTexto);
    if (erro) {
        alert(erro);
        return;
    }

    
    localStorage.setItem("saldoGlobal", saldo);
    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("tipoUsuario", tipo);
    localStorage.setItem("serieUsuario", serie);

    
    window.location.href = "jogo.html";
});




