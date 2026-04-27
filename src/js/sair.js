document.getElementById("btn-sair").addEventListener("click", (e) => {
    e.preventDefault(); // faz com que primeiro rode o código e depois vá para próxima página

    // limpa os dados salvos
    localStorage.removeItem("totalAposta");
    localStorage.removeItem("saldoGlobal");
    localStorage.removeItem("ganhoTotal");
    localStorage.removeItem("ultimaPartida");
    
    window.location.href = "index.html";
});



