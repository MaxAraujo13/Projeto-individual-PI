var cruzadinhaModel = require("../models/cruzadinhaModel");


function enviarPontuacao(req,res) {

    let pontuacao = req.body.pontuacaoServer

    let idUsuario = req.body.idUsuarioServer;

    if (idUsuario == undefined) {

        res.status(400).send("Seu id está undefined!");

    } else if (pontuacao == undefined) {

        res.status(400).send("Sua pontuacao está undefined");

    } else {

        cruzadinhaModel.enviarPontuacao(pontuacao, idUsuario)
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

    enviarPontuacao

}