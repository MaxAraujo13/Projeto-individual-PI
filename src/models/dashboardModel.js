var database = require("../database/config");

// Conta quantas vezes o usuário logado acessou cada entidade
function buscarAcessosPorEntidade(idUsuario) {

    let instrucaoSql = `
        SELECT 
            entidade_acessada,
            COUNT(*) AS total
        FROM acesso
        WHERE fk_Usuario = ${idUsuario}
        GROUP BY entidade_acessada
        ORDER BY total DESC;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


// Conta quantos usuários cadastrados têm a mesma entidade de frente que o usuário logado.

function buscarUsuariosComMesmoFrenteiro(idUsuario) {

    let instrucaoSql = `
        SELECT COUNT(*) AS total_mesmo_frenteiro
        FROM usuario
        WHERE entidade = (
            SELECT entidade 
            FROM usuario 
            WHERE idUsuario = ${idUsuario}
        );
    `;

    console.log(`Executando SQL:\n ${instrucaoSql}`);

    return database.executar(instrucaoSql);
}

// Busca a pontuação mais recente do usuário no jogo cruzadinha.        

function buscarPontuacaoCruzadinha(idUsuario) {

    let instrucaoSql = `
        SELECT 
            SUM(pontuacao) AS pontuacao
        FROM cruzadinha
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


// Chamado pelo tela-entidades.html sempre que o usuário seleciona uma entidade.

function registrarAcesso(idUsuario, nomeEntidade) {

    let instrucaoSql = `
        INSERT INTO acesso (fk_Usuario, entidade_acessada, momento)
        VALUES (${idUsuario}, '${nomeEntidade}', NOW());
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

// Conta quantos usuários possuem cada entidade como frenteiro (para o gráfico de pizza)

function buscarDistribuicaoFrenteiros() {

    let instrucaoSql = `
        SELECT 
            entidade,
            COUNT(*) AS total
        FROM usuario
        GROUP BY entidade
        ORDER BY total DESC;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarAcessosPorEntidade,
    buscarUsuariosComMesmoFrenteiro,
    buscarPontuacaoCruzadinha,
    registrarAcesso,
    buscarDistribuicaoFrenteiros
};