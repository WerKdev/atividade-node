const sequelize = require('./config/database');

async function testar() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados bem-sucedida!');
    } catch (error) {
        console.error('❌ Erro ao conectar:', error);
    } finally {
        await sequelize.close();
    }
}

testar();
