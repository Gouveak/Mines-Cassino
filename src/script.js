const malha = document.getElementById("malha");

for (let i = 0; i < 25; i++) {

    const bloco = document.createElement("div");
    bloco.classList.add("bloco");

    malha.appendChild(bloco);

}