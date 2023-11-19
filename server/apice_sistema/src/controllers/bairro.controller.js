// controllers/produtos.contrroller.js
const bairroServico = require("../services/servicoBairro")

const bairroController = {

    getBairros: async (req, res) => {
        try {
            const data = await bairroServico.getBairros();
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados do banco de dados:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    getBairroById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await bairroServico.getBairroById(id);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    getBairroByNome: async (req, res) => {
        try {
            const { bairro_nome } = req.params;
            const data = await bairroServico.getBairroByBairroNome(bairro_nome);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    postBairro: async (req, res) => {
        try {
            const { bairro_nome, id_bairro } = req.body;
            const result = await bairroServico.createBairro(bairro_nome, id_bairro);

            if (result) {
                res.status(201).json({ message: 'Bairro criado com sucesso' });
            } else {
                res.status(500).json({ error: 'Erro ao inserir dados na tabela Bairro' });
            }
        } catch (error) {
            console.error('Erro ao inserir dados na tabela Bairros:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },


    putBairro: async (req, res) => {
        try {
            const { bairro_nome } = req.body;
            const { id } = req.params;
            const result = await bairroServico.updateBairro(id, bairro_nome);
            if (result.affectedRows === 1 || res.status(200)) {
                res.json({ message: 'Bairro atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'Bairro não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao editar dados dos Bairros:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },

    deleteBairro: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await bairroServico.deleteBairro(id);
            if (result.affectedRows === 1 || res.status(200)) {
                res.json({ message: 'Bairro deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'Bairro não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar dados dos Bairros:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },
}

module.exports = bairroController