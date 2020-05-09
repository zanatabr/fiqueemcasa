const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fiqueemcasa.db');

db.serialize(function() {

    // Criar tabela
    db.run(`
      CREATE TABLE IF NOT EXISTS proposals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
        );
    `);
        
    // Inserir dado na tabela
    const query = `
    INSERT INTO proposals (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `;

    const values = [
        "https://image.flaticon.com/icons/svg/2877/2877881.svg",
        "Cursos de Programação",
        "Estudos",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quisquam sapiente mollitia sequi aliquam necessitatibus laudantium eum qui enim veritatis...",
        "http://www.dfdx.com.br"        
    ];
    /*

    db.run(query, values, function(err) {
        if (err) return console.log(err);

        console.log(this);
    });
*/


    // deletar dados da tabela
    // db.run('DELETE FROM proposals WHERE id = ?', [5], function(err) {
    //     if (err) return console.log(err);

    //     console.log("REMOVIDO", this);
    // })

    // Consultar dados na tabela
    db.all('SELECT * FROM proposals', function(err, rows) {
        if (err) return console.log(err);

        console.log(rows);
    });

});


module.exports = db;