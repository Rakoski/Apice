const cidadeServico = require("../services/servicoCidade")
const bairroServico = require("../services/servicoBairro");

const cidadeController = {

    getCidades: async (req, res) => {
        try {
            const data = await cidadeServico.getCidade();
            res.json({data});
        } catch (error) {
            console.error("Erroo pegar dados do banco de dados:", error);
            res.status(500).json({error: "Um erro ocorreu"});
        }
    },

    getCidadeById: async (req, res) => {
        try {
            const {id} = req.params;
            const data = await cidadeServico.getCidadeById(id);
            res.json({data});
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({error: "Um erro ocorreu"});
        }
    },

    getCidadeByNome: async (req, res) => {
        try {
            const { cidade_nome } = req.params;
            const data = await cidadeServico.getCidadeByCidadeNome(cidade_nome);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    postCidade: async (req, res) => {
        try {
            const {cidade_nome, sigla_uf, id_cidade} = req.body;
            const result = await cidadeServico.createCidade(cidade_nome, sigla_uf, id_cidade);

            if (result.affectedRows === 1 || res.status(200)) {
                res.status(201).json({message: 'Cidade criado com sucesso'});
            } else {
                res.status(500).json({error: 'Erro ao inserir dados na tabela produto'});
            }
        } catch (error) {
            console.error('Erro ao inserir dados na tabela produto:', error);
            res.status(500).json({error: 'Um erro ocorreu'});
        }
    },

    putCidade: async (req, res) => {
        try {
            const {cidade_nome, sigla_uf} = req.body;
            const {id} = req.params;
            const result = await cidadeServico.updateCidade(id, cidade_nome, sigla_uf);
            if (result.affectedRows === 1 || res.status(404) || res.status(200)) {
                res.json({message: 'Cidade atualizado com sucesso'});
            }
        } catch (error) {
            console.error('Erro ao editar dados das cidades:', error);
            res.status(500).json({error: 'Um erro ocorreu'});
        }
    },

    deleteCidade: async (req, res) => {
        try {
            const {id} = req.params;
            const result = await cidadeServico.deleteCidade(id);
            if (result.affectedRows === 1) {
                res.json({message: 'Cidade deletado com sucesso'});
            } else {
                res.status(404).json({error: 'Cidade não encontrado'});
            }
        } catch (error) {
            console.error('Erro ao deletar dados dos produtos:', error);
            res.status(500).json({error: 'Um erro ocorreu'});
        }
    },
};

module.exports = cidadeController;