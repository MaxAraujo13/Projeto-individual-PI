var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {

    let email = req.body.emailServer;

    let senha = req.body.senhaServer;

    if (email == undefined) {

        res.status(400).send("Seu email está undefined!");

    } else if (senha == undefined) {

        res.status(400).send("Sua senha está indefinida!");

    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultado) {

                if (resultado.length == 1) {

                    res.status(200).json(resultado[0]);

                } else if (resultado.length == 0) {

                    res.status(403).send("Email e/ou senha inválido(s)");

                } else {

                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");

                }
            })
            .catch(function (erro) {

                console.log(erro);

                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);

                res.status(500).json(erro.sqlMessage);

            });
    }
}

function cadastrar(req, res) {
    // Recupera os valores enviados pelo fetch no cadastroUmbanda.html

    let nome = req.body.nomeServer;

    let email = req.body.emailServer;

    let senha = req.body.senhaServer;

    let entidade = req.body.entidadeServer;

    let estado = req.body.estadoServer;

    // Validações dos valores recebidos
    if (nome == undefined) {

        res.status(400).send("Seu nome está undefined!");

    } else if (email == undefined) {

        res.status(400).send("Seu email está undefined!");

    } else if (senha == undefined) {

        res.status(400).send("Sua senha está undefined!");

    } else if (entidade == undefined) {

        res.status(400).send("Sua entidade está undefined!");

    } else if (estado == undefined) {

        res.status(400).send("Seu estado está undefined!");

    } else {
      
        usuarioModel.cadastrar(nome, email, senha, entidade, estado)
            .then(
                function (resultado) {

                    res.status(201).json(resultado);

                    console.log('foi pro banco')
                }
            ).catch(
                function (erro) {

                    console.log(erro);

                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}