const { DataTypes } = require("sequelize");
const Sequelize = require("../../sequelize");
const Pessoa = require("./pessoa");

module.exports = (sequelize) => {
    const Cidade = sequelize.define("Cidade", {
        id_cidade: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        cidade_nome: DataTypes.STRING,
        sigla_uf: DataTypes.STRING(3),
    },
        {
            timestamps: false,
            tableName: "cidade",
        }
    );

    return Cidade;
};
