const venda_produtosService = require("../services/servicoVendaProduto")

const venda_produtosController = {

    getVendaProdutos: async (req, res) => {
        try {
            const data = await venda_produtosService.getVendaProdutos();
            res.json({ data });
        } catch (error) {
            console.error("Erroo pegar dados do banco de dados:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    getVendaProdutoById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await venda_produtosService.getVendaProdutoById(id);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    getVendasByIdProduto: async (req, res) => {
        try {
            const { produto_id } = req.params;
            const data = await venda_produtosService.getVendasByProdutoId(produto_id);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu" });
        }
    },

    postVendaProduto: async (req, res) => {
        try {
            const { venda_id, produtos } = req.body;
            const result = await venda_produtosService.createVendaProduto(venda_id, produtos);

            if (result) {
                res.status(201).json({ message: 'venda_produto criado com sucesso' });
            } else {
                res.status(500).json({ error: 'Erro ao inserir dados na tabela venda_produto' });
            }
        } catch (error) {
            console.error('Erro ao inserir dados na tabela venda_produto: ', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },

    putVendaProduto: async (req, res) => {
        try {
            const { pessoa_id, valor_venda_produto } = req.body;
            const { id } = req.params;
            const result = await venda_produtosService.updateVendaProduto(id, pessoa_id, valor_venda_produto);
            if (result.affectedRows === 1) {
                res.json({ message: 'venda_produto atualizado com sucesso' });
            } else {
                res.status(404).json({ error: 'venda_produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao editar dados dos venda_produtos:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },

    deleteVendaProduto: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await venda_produtosService.deleteVendaProduto(id);
            if (result.affectedRows === 1) {
                res.json({ message: 'venda_produto deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'venda_produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar dados dos venda_produtos:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },
};

module.exports = venda_produtosController;