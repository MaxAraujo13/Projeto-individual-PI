var dashboardModel = require("../models/dashboardModel");

// Acessos por entidade 
function buscarAcessosPorEntidade(req, res) {

    let idUsuario = req.params.idUsuario;

    dashboardModel.buscarAcessosPorEntidade(idUsuario)
        .then(function (resultado) {

            if (resultado.length > 0) {

                res.status(200).json(resultado);

            } else {

                res.status(204).send("Nenhum acesso registrado ainda.");
            }
        })
        .catch(function (erro) {

            console.log(erro)

            console.log("Erro ao buscar acessos:", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);

        });
}

// Usuários com o mesmo frenteiro
function buscarUsuariosComMesmoFrenteiro(req, res) {

    let idUsuario = req.params.idUsuario;

    dashboardModel.buscarUsuariosComMesmoFrenteiro(idUsuario)
        .then(function (resultado) {

            if (resultado.length > 0) {

                res.status(200).json(resultado[0]);

            } else {

                res.status(204).send("Nenhum resultado encontrado.");

            }

        })
        .catch(function (erro) {

            console.log(erro)

            console.log("Erro ao buscar frenteiro:", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}

// Pontuação na cruzadinha
function buscarPontuacaoCruzadinha(req, res) {

    let idUsuario = req.params.idUsuario;

    dashboardModel.buscarPontuacaoCruzadinha(idUsuario)
        .then(function (resultado) {

            if (resultado.length > 0) {

                res.status(200).json(resultado[0]);

            } else {

                res.status(204).send("Nenhuma partida encontrada.");
            }
        })
        .catch(function (erro) {

            console.log(erro)

            console.log("Erro ao buscar cruzadinha:", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);

        });
}

// Registrar acesso a entidade
function registrarAcesso(req, res) {

    let idUsuario = req.params.idUsuario;

    let nomeEntidade = req.body.nomeEntidade;

    if (!nomeEntidade) {

        return res.status(400).send("nomeEntidade está indefinido.");
    }

    dashboardModel.registrarAcesso(idUsuario, nomeEntidade)

        .then(function (resultado) {

            res.status(201).json(resultado);
        })
        .catch(function (erro) {

            console.log(erro)

            console.log("Erro ao registrar acesso:", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}

// Distribuição de frenteiros entre todos os usuários (gráfico de pizza)
function buscarDistribuicaoFrenteiros(req, res) {

    dashboardModel.buscarDistribuicaoFrenteiros()
        .then(function (resultado) {

            if (resultado.length > 0) {

                res.status(200).json(resultado);

            } else {

                res.status(204).send("Nenhum dado encontrado.");
            }
        })
        .catch(function (erro) {

            console.log(erro)

            console.log("Erro ao buscar distribuição de frenteiros:", erro.sqlMessage);

            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {

    buscarAcessosPorEntidade,
    buscarUsuariosComMesmoFrenteiro,
    buscarPontuacaoCruzadinha,
    registrarAcesso,
    buscarDistribuicaoFrenteiros

};