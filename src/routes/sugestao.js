var express = require("express");

var router = express.Router();

var sugestaoController = require("../controllers/sugestaoController");

// Envia as sugestões para o banco

router.post("/enviarSugestao", function (req, res) {

    sugestaoController.enviarSugestao(req, res);

});

module.exports = router;