// criar e configurar o server
const express = require("express");
const server = express();

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// confgurar o nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views",{
    express: server,
    noCache: true  // em dev é bom desabilitar
});

// criação da rota "/"
server.get("/", function(req, res) {
    return res.render("index.html");
});

server.get("/proposals", function(req, res) {
    return res.render("sugestoes.html");
});

// server ativo no port TCP 3000
server.listen(3000);