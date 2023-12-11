const { DataTypes } = require('sequelize');
const sequelize = require("../../sequelize");

const Usuario = sequelize.define(
    'Usuario',
    {
        usuario_nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_sobrenome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_senha_hash: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        usuario_senha_salt: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'usuario',
    }
);

module.exports = Usuario;
