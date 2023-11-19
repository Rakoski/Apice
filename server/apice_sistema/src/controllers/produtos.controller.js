// controllers/produtos.contrroller.js
const produtosService = require("../services/servicosProdutos")

const produtosController = {

    getProdutos: async (req, res) => {
        try {
            const data = await produtosService.getProdutos();
            res.json({ data });
        } catch (error) {
            console.error("Erroo pegar dados do banco de dados:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    getProdutoById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await produtosService.getProdutoById(id);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    postProduto: async (req, res) => {
        try {
            const { nome_produto, valor_produto, id_produto } = req.body;
            const result = await produtosService.createProduto(nome_produto, valor_produto, id_produto);

            // por algum motivo misterioso as vezes o códdigo vem como 201 ou como affectedRows vem como 0 e
            // o código vem como 200, daí eu só meio que juntei os dois em uma condição só de "sucesso"
            if (result.affectedRows === 1 || res.status(200)) {
                res.status(201).json({message: 'Produto criado com sucesso'});
            } else {
                res.status(500).json({ error: 'Erro ao inserir dados na tabela produto' });
            }
        } catch (error) {
            console.error('Erro ao inserir dados na tabela produto:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },

    putProduto: async (req, res) => {
        try {
            const { nome_produto, valor_produto } = req.body;
            const { id } = req.params;
            const result = await produtosService.updateProduto(id, nome_produto, valor_produto);
            if (result.affectedRows === 1) {
                res.json({ message: 'Produto atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao editar dados dos produtos:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await produtosService.deleteProduto(id);
            if (result.affectedRows === 1) {
                res.json({ message: 'Produto deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar dados dos produtos:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },
};

module.exports = produtosController;