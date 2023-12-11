const { DataTypes } = require('sequelize');
const sequelize = require("../../sequelize");

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            id_usuario: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                default: true
            },
            usuario_nome: DataTypes.STRING,
            usuario_sobrenome: DataTypes.STRING,
            usuario_email: DataTypes.STRING,
            usuario_senha: DataTypes.STRING
        },
        {
            timestamps: false,
            tableName: "usuario",
        }
    );

    return Usuario;
};
