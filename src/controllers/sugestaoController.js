var sugestaoModel = require("../models/sugestaoModel");


function enviarSugestao(req,res) {

    let nome = req.body.nomeServer;

    let msg = req.body.mensagemServer;

    let idUsuario = req.body.idUsuarioServer;

    if (nome == undefined) {

        res.status(400).send("Seu nome está undefined!");

    } else if (msg == undefined) {

        res.status(400).send("Sua mensagem está undefined");

    } else {

        sugestaoModel.enviarSugestao(nome, msg, idUsuario)
            .then(

                function (resultado) {

                    res.status(201).json(resultado);

                    console.log("foi pro banco");

                }
            ).catch(
                function (erro) {

                    console.log(erro);

                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );

                    res.status(500).json(erro.sqlMessage)

                }

            )

    }

}

module.exports = {

    enviarSugestao

}