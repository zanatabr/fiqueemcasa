// criar e configurar o server
const express = require("express");
const server = express();

const db = require("./db");

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

// confgurar o nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("views",{
    express: server,
    noCache: true  // em dev é bom desabilitar
});

// criação da rota "/"
server.get("/", function(req, res) {

    db.all('SELECT * FROM proposals', function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados");
        }

        const lastProposals = [...rows].slice(-2).reverse();
        
        return res.render("index.html", {proposals: lastProposals} );
    });

});

server.get("/proposals", function(req, res) {
    db.all('SELECT * FROM proposals', function(err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados");
        }
        return res.render("sugestoes.html", {proposals: [...rows].reverse()});
    });    
    
});

server.post("/", function(req, res) {
    // Inserir dado na tabela
    const query = `
        INSERT INTO proposals (
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);`;

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ];

    db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no banco de dados");
        }

        return res.redirect("/proposals");
    });

});


// server ativo no port TCP 3000
server.listen(3000);