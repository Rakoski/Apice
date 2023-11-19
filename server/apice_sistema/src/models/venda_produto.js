const Venda = require("./venda")
const Produto = require("./produto")
const {DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const VendaProduto = sequelize.define(
        "VendaProduto",
        {
            id_vendaproduto: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            produto_id: {
                type: DataTypes.BIGINT,
                defaultValue: null,
                foreignKey: true
            },
            venda_id: {
                type: DataTypes.BIGINT,
                defaultValue: null,
                foreignKey: true
            }
        },
        {
            timestamps: false,
            tableName: "venda_produto",
        }
    );

    return VendaProduto;
};