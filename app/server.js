// criar e configurar o server
const express = require("express");
const server = express();

const proposals = [
    {
        img: "https://image.flaticon.com/icons/svg/2877/2877881.svg",
        title: "Cursos de Programação",
        category: "Estudos",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam sapiente mollitia sequi aliquam necessitatibus laudantium eum qui enim veritatis...",
        url:"http://www.dfdx.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/753/753024.svg",
        title: "Exercícios Físicos",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam sapiente mollitia sequi aliquam necessitatibus laudantium eum qui enim veritatis...",
        url:"http://www.dfdx.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2436/2436636.svg",
        title: "Clube de Leitura",
        category: "Livros",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam sapiente mollitia sequi aliquam necessitatibus laudantium eum qui enim veritatis...",
        url:"http://www.dfdx.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/753/753024.svg",
        title: "Meditação",
        category: "Estudos",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam sapiente mollitia sequi aliquam necessitatibus laudantium eum qui enim veritatis...",
        url:"http://www.dfdx.com.br"
    }
];

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
    //let lastProposals = proposals.slice(-2).reverse();
    const lastProposals = [...proposals].slice(-2).reverse();
    
    return res.render("index.html", {proposals: lastProposals} );
});

server.get("/proposals", function(req, res) {
    return res.render("sugestoes.html", {proposals: [...proposals].reverse()});
});

// server ativo no port TCP 3000
server.listen(3000);