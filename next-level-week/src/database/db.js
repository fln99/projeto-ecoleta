// Importa a dependencia do sqlite3.
const sqlite3 = require('sqlite3').verbose();

// O método verbose() mostra mais informações no terminal.

// Cria o objeto que irá fazer operações no banco de dados.
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;
// Utiliza o db para as operações.
db.serialize(() => {
    // Com comandos SQL eu vou:

    // 1 - Criar tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         adress TEXT,
    //         adress2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `);

    // // 2 - Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         adress,
    //         adress2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `;
    
    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    // ];

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err);
    //     };

    //     console.log('Cadastrado com sucesso!');
    //     console.log(this);
    // };

    // db.run(query, values, afterInsertData);

    // 3 - Consultar dados da tabela
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err);
    //     };

    //     console.log('Aqui estão seus registros:');
    //     console.log(rows);
    // });

    // 4 - Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [13], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     };

    //     console.log('Registro deletado com sucesso!');
    // });
});