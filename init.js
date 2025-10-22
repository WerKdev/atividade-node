const sequelize = require('./config/database');
const Produto = require('./models/produto');

async function init() {
    try {
        // Conectar ao banco
        await sequelize.authenticate();
        console.log('Conexão com o banco estabelecida com sucesso.');
        
        // Sincronizar modelos (criar tabelas se não existirem)
        await sequelize.sync();
        console.log('Modelos sincronizados com sucesso.');
        
        // Inserir alguns dados de exemplo (opcional)
        const produtosExemplo = await Produto.findAll();
        if (produtosExemplo.length === 0) {
            await Produto.bulkCreate([
                {
                    descricao: 'Notebook Dell Inspiron',
                    quantidade: 5,
                    valor: 2500.00,
                    data: new Date()
                },
                {
                    descricao: 'Mouse Logitech',
                    quantidade: 20,
                    valor: 45.90,
                    data: new Date()
                }
            ]);
            console.log('Dados de exemplo inseridos.');
        }
        
        console.log('Inicialização concluída!');
    } catch (error) {
        console.error('Erro durante a inicialização:', error);
    } finally {
        await sequelize.close();
    }
}

init();
