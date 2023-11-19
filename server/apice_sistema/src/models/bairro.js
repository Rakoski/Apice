module.exports = (sequelize, DataTypes) => {
    const Bairro = sequelize.define("Bairro",
        {
            id_bairro: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            bairro_nome: DataTypes.STRING,
        },
        {
            timestamps: false,
            tableName: "bairro",
        }
    );

    return Bairro;
};
