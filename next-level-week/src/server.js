const express = require('express');
const server = express();

// Pegar o banco de dados
const db = require('./database/db');

// Configurar pasta pública
server.use(express.static('public'));

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

// Usando template engine - nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

// Configurar caminhos da aplicação
// Página inicial
// req: Requisição
// res: Resposta
server.get('/', (req, res) => {
    return res.render('index.html');
});

server.get('/create-point', (req, res) => {

    // req.query: Query Strings da nossa URL
    // console.log(req.query)

    return res.render('create-point.html');
});

server.post('/savepoint', (req, res) => {

    // req.body: O corpo do nosso formulário
    // console.log(req.body)
    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err);
            // return res.send('Erro no cadastro!');
            // Renderiza o modal do erro
            return res.render('create-point.html', { error: true });
        };

        console.log('Cadastrado com sucesso!');
        console.log(this);

        return res.render('create-point.html', { saved: true });
    };

    db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {

    const search = req.query.search;

    if(search == '') {
        // Pesquisa vazia
        return res.render('search-results.html', { total: 0 });
    };

    // Pegar os dados do banco de dados :O
    // A seguinte consulta possibilita que o usuário pesquise sem exatidão ao
    // nome da cidade. Por exemplo, ao pesquisar 'Rio', retornará todas as cidades cadastradas
    // com 'Rio' no começo ou final do nome :)
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        };

        const total = rows.length;

        // Mostrar a página HTML com os dados do banco de dados
        return res.render('search-results.html', { places: rows, total });
    });
});

// Liga o servidor / ouve a porta 3000
server.listen(3000);