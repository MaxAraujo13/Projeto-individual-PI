var database = require("../database/config");


function enviarSugestao(nome, msg, idUsuario) {
    
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", nome,msg);

    let instrucaoSql = `
        INSERT INTO sugestao (nome, descricao, fkUsuario) VALUES ('${nome}','${msg}',${idUsuario})
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
};

module.exports = {

    enviarSugestao

};