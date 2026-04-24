function salvarPartida(rodadas, scoreFinal) {

    // pego o nome do jogador que foi salvo anteriormente
    const nome = localStorage.getItem("nomeUsuario");

    // pego o score inicial (esse valor vai aparecer no Excel depois)
    const scoreInicial = localStorage.getItem("scoreInicial");

    // crio um objeto com os dados da partida
    // esses são exatamente os dados que vão virar linhas no Excel
    const partida = {
        nome: nome,
        rodadas: rodadas,
        scoreInicial: scoreInicial,
        scoreFinal: scoreFinal
    };

    // recupero as partidas já salvas (se não tiver nenhuma, começa com array vazio)
    let dados = JSON.parse(localStorage.getItem("partidas")) || [];

    // adiciono a nova partida na lista
    dados.push(partida);

    // salvo tudo de volta no localStorage
    // esses dados ficam guardados até eu exportar pro Excel
    localStorage.setItem("partidas", JSON.stringify(dados));
}



function exportarCSV() {

    // pego todas as partidas salvas
    let dados = JSON.parse(localStorage.getItem("partidas")) || [];

    // aqui eu monto o "cabeçalho" da planilha do Excel
    // uso ; porque o Excel brasileiro separa colunas com ponto e vírgula
    let csv = "Nome;Rodadas;Score Inicial;Score Final\n";

    // aqui eu transformo cada partida em uma linha da planilha
    dados.forEach(p => {
        csv += `${p.nome};${p.rodadas};${p.scoreInicial};${p.scoreFinal}\n`;
    });

    // crio o arquivo CSV (formato que o Excel consegue abrir)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // crio um link temporário para baixar o arquivo
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    // nome do arquivo que vai abrir no Excel
    link.download = "dados_jogo.csv";

    // simulo o clique pra baixar automaticamente
    link.click();
}