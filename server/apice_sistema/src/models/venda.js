const Pessoa = require("./pessoa")
const VendaProduto = require("./venda_produto")
const {DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Venda = sequelize.define(
        "Venda",
        {
            id_venda: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            pessoa_id: {
                type: DataTypes.BIGINT,
                defaultValue: null,
                foreignKey: true
            },
            valor_venda: DataTypes.DECIMAL(15, 2),
            data_venda: DataTypes.DATE
        },
        {
            timestamps: false,
            tableName: "venda",
        }
    );

    return Venda;
};