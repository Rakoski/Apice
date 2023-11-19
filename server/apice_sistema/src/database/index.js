const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// estava tendo problemas com o .env então preciso usar isso para ter certeza das configurações
// isso pois já que como normalmente uso o application.properties no spring boot, nunca tinha usado o .env antes
if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DBNAME) {
    console.error('Erro de variáveis de ambiente e/ou configurações de banco da dados');
    process.exit(500);
}


module.exports = pool;