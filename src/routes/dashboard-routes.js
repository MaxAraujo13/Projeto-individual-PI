var express = require("express");
var router  = express.Router();

var dashboardController = require("../controllers/dashboardController");

// Gráfico: acessos do usuário por entidade

router.get("/acessos/:idUsuario", function (req, res) {

    dashboardController.buscarAcessosPorEntidade(req, res);

});

// KPI: quantos usuários têm o mesmo frenteiro

router.get("/frenteiro/:idUsuario", function (req, res) {

    dashboardController.buscarUsuariosComMesmoFrenteiro(req, res);

});

// KPI: pontuação mais recente na cruzadinha

router.get("/cruzadinha/:idUsuario", function (req, res) {

    dashboardController.buscarPontuacaoCruzadinha(req, res);

});

// Registrar acesso a uma entidade (chamado pelo tela-entidades.html)
router.post("/registrar-acesso/:idUsuario", function (req, res) {

    dashboardController.registrarAcesso(req, res);

});

// Gráfico de pizza: distribuição de frenteiros entre todos os usuários
router.get("/distribuicao-frenteiros", function (req, res) {

    dashboardController.buscarDistribuicaoFrenteiros(req, res);

});

module.exports = router;