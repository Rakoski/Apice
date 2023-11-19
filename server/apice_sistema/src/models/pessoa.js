const { DataTypes } = require("sequelize");
const sequelize = require("../../sequelize");
const Cidade = require('./cidade');
const Bairro = require("./bairro")
const Venda = require("./venda")

module.exports = (sequelize) => {
    const Pessoa = sequelize.define("Pessoa", {
        id_pessoa: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        pessoa_nome: DataTypes.STRING,
        cep: DataTypes.STRING(9),
        endereco: DataTypes.STRING,
        numero: DataTypes.STRING(5),
        complemento: DataTypes.STRING,
        telefone: DataTypes.STRING(21),
        email: DataTypes.STRING,
            bairro_id: {
                type: DataTypes.INTEGER,
                defaultValue: null,
            },
        cidade_id: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        }
    },
        {
        timestamps: false,
        tableName: "pessoa",
    });

    Pessoa.belongsTo(sequelize.models.Bairro, { foreignKey: "bairro_id" });
    Pessoa.belongsTo(sequelize.models.Cidade, {foreignKey: "cidade_id"});

    return Pessoa;
};
