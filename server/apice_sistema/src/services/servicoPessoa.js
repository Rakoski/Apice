const db = require('../models');
class PessoaService {
    async createPessoa(newPessoaData) {
        try {
            const createdPessoa = await db.pessoa.create(newPessoaData);
            return createdPessoa;
        } catch (error) {
            throw error;
        }
    }

    async getPessoas() {
        try {
            const pessoas = await db.pessoa.findAll();
            return pessoas;
        } catch (error) {
            throw error;
        }
    }

    async getPessoaById(id) {
        try {
            const pessoa = await db.pessoa.findByPk(id);
            return pessoa;
        } catch (error) {
            throw error;
        }
    }

    async updatePessoa(id_pessoa, updatedPessoaData) {
        try {
            const updatedPessoa = await db.pessoa.update(updatedPessoaData, {
                where: { id_pessoa },
                returning: true,
            });
        } catch (error) {
            throw error;
        }
    }

    async deletePessoa(id_pessoa) {
        try {
            await db.pessoa.destroy({
                where: { id_pessoa },
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PessoaService();
