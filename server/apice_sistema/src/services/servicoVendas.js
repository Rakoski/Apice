const { Sequelize, DataTypes, Op} = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);
const Venda = require('../models/venda')(sequelize, DataTypes);

const vendaServico = {
    getVendas: async () => {
        try {
            return await Venda.findAll();
        } catch (error) {
            throw error;
        }
    },

    getVendaById: async (id) => {
        try {
            const venda = await Venda.findOne({ where: { id_venda: id } });
            return venda;
        } catch (error) {
            throw error;
        }
    },

    getVendaIdByVendaInfo: async (valor_venda, data_venda) => {
        try {
            const [results, metadata] = await sequelize.query(
                'SELECT id_venda FROM venda WHERE valor_venda = :valor_venda AND data_venda = :data_venda',
                {
                    replacements: { valor_venda, data_venda },
                    type: Sequelize.QueryTypes.SELECT,
                }
            );
            return results
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    getVendasBetweenDates: async (data_inicial, data_final) => {
        try {
            return await Venda.findAll({
                where: {
                    data_venda: {
                        [Op.between]: [data_inicial, data_final],
                    },
                },
            });
        } catch (error) {
            throw new Error('Erro ao pegar as datas das vendas: ' + error);
        }
    },

    createVenda: async (pessoa_id, valor_venda, data_venda, id_venda = null) => {
        try {
            const vendaData = {
                pessoa_id,
                valor_venda,
                data_venda
            };

            if (id_venda !== null) {
                vendaData.id_venda = id_venda;
            }

            return await Venda.create(vendaData);
        } catch (error) {
            throw error;
        }
    },


    updateVenda: async (id_venda, pessoa_id, valor_venda) => {
        try {
            const [updatedRowsCount] = await Venda.update(
                { pessoa_id, valor_venda },
                { where: { id_venda: id_venda}},
            );

            if (updatedRowsCount === 1) {
                return { message: 'Venda atualizado com sucesso' };
            }
        } catch (error) {
            throw error;
        }
    },

    deleteVenda: async (id) => {
        try {
            const deletedRowCount = await Venda.destroy({ where: { id_venda: id } });

            if (deletedRowCount === 1) {
                return { message: 'Venda deletado com sucesso' };
            }
        } catch (error) {
            throw error;
        }
    },



};

module.exports = vendaServico;