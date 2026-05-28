var express = require("express");

var router = express.Router();

var cruzadinhaController = require("../controllers/cruzadinhaController");

// Envia as sugestões para o banco

router.post("/enviarPontuacao", function (req, res) {

    cruzadinhaController.enviarSugestao(req, res);

});

module.exports = router;