const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Produto = require('./models/produto');

const app = express();
const PORT = 3004;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
    res.redirect('/produtos');
});

// Listar produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            order: [['id', 'DESC']]
        });
        res.render('produtos', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Cadastrar produto
app.post('/produtos', async (req, res) => {
    try {
        const { descricao, quantidade, valor } = req.body;
        
        await Produto.create({
            descricao,
            quantidade: parseInt(quantidade),
            valor: parseFloat(valor),
            data: new Date()
        });
        
        res.redirect('/produtos');
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});