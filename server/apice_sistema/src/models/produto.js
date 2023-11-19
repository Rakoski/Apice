const VendaProduto = require("./venda_produto")

module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define(
        "Produto",
        {
            id_produto: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            nome_produto: DataTypes.STRING,
            valor_produto: DataTypes.DECIMAL(15, 2),
        },
        {
            timestamps: false,
            tableName: "produto",
        }
    );

    return Produto;
};