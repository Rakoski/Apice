const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

const Cidade = require('../models/cidade')(sequelize, DataTypes);

const CidadesService = {
    getCidade: async () => {
        try {
            return await Cidade.findAll();
        } catch (error) {
            throw error;
        }
    },

    getCidadeById: async (id) => {
        try {
            return await Cidade.findOne({ where: { id_cidade: id } });
        } catch (error) {
            throw error;
        }
    },

    getCidadeByCidadeNome: async (cidade_nome) => {
        try {
            const cidade = await Cidade.findOne({ where: { cidade_nome: cidade_nome } });
            return cidade;
        } catch (error) {
            throw error;
        }
    },

    createCidade: async (cidade_nome, sigla_uf, id_cidade = null) => {
        try {
            const cidadeData = {
                cidade_nome,
                sigla_uf,
            };

            if (id_cidade !== null) {
                cidadeData.id_cidade = id_cidade;
            }

            return await Cidade.create(cidadeData);
        } catch (error) {
            throw error;
        }
    },

    updateCidade: async (id, cidade_nome, sigla_uf) => {
        try {
            const [updatedRowsCount] = await Cidade.update(
                { cidade_nome, sigla_uf },
                { where: { id_cidade: id } }
            );

            if (updatedRowsCount === 1) {
                return { message: 'Cidade atualizado com sucesso' };
            } else {
                throw new Error('Cidade não encontrado ou não atualizado');
            }
        } catch (error) {
            console.error('Erro ao atualizar cidade:', error);
            throw error;
        }
    },


    deleteCidade: async (id) => {
        try {
            const deletedRowCount = await Cidade.destroy({ where: { id_cidade: id } });

            if (deletedRowCount === 1) {
                return { message: 'Cidade deletado com sucesso' };
            }
        } catch (error) {
            throw error;
        }
    },

};

module.exports = CidadesService;
