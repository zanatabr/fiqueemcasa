// criar e configurar o server
const express = require("express");
const server = express();

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// criação da rota "/"
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/index.html");
});

server.get("/proposals", function(req, res) {
    return res.sendFile(__dirname + "/sugestoes.html");
});

// server ativo no port TCP 3000
server.listen(3000);