const express = require("express");
const app = express();
const cors = require('cors');
const Sequelize = require("sequelize");

require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: console.log,
    }
);

sequelize.sync({ force: true }).then(() => {
    console.log('Banco de dados sincronizado.');
});

const postsRouter = require('./src/routes/router')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", postsRouter);

// pra facilitar o netstat
const porta = 8081;

sequelize.sync()
    .then(() => {
        app.listen(porta, () => {
            console.log("Servidor ta rodando na porta", porta);
        });
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o sequelize: ", error);
    });
