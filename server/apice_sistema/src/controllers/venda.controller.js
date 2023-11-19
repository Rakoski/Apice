// controllers/vendas.contrroller.js
const vendasService = require("../services/servicoVendas")

const vendasController = {

    getVendas: async (req, res) => {
        try {
            const data = await vendasService.getVendas();
            res.json({ data });
        } catch (error) {
            console.error("Erroo pegar dados do banco de dados:", error);
            res.status(500).json({ error: "Um erro ocorreu"});
        }
    },

    getVendaById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await vendasService.getVendaById(id);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu"});
        }
    },

    getVendaIdByInfo: async (req, res) => {
        try {
            const { valor_venda, data_venda } = req.params;
            const data = await vendasService.getVendaIdByVendaInfo(valor_venda, data_venda)
            res.json({ data });
        } catch (error) {
            console.error("Erro ao pegar dados pelas informações:", error);
            res.status(500).json({ error: "Um erro ocorreu"});
        }
    },

    getVendaDates: async (req, res) => {
        try {
            const { data_inicial, data_final } = req.params;
            const data = await vendasService.getVendasBetweenDates(data_inicial, data_final);

            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ error: 'Dados das datas não encontrados' });
            }
        } catch (error) {
            console.error('Erro ao encontrar as datas:', error);
            res.status(500).json({ error: 'Um erro ocorreu' });
        }
    },


    postVenda: async (req, res) => {
        try {
            const { pessoa_id, valor_venda, data_venda, id_venda } = req.body;
            const result = await vendasService.createVenda(pessoa_id, valor_venda, data_venda, id_venda);

            if (result.affectedRows === 1 || res.status(200)) {
                res.status(201).json({message: 'venda criado com sucesso'});
            } else {
                res.status(500).json({ error: 'Erro ao inserir dados na tabela venda' });
            }
        } catch (error) {
            console.error('Erro ao inserir dados na tabela venda:', error);
            res.status(500).json({ error: 'Um erro ocorreu'});
        }
    },

    putVenda: async (req, res) => {
        try {
            const { pessoa_id, valor_venda } = req.body;
            const { id } = req.params;
            await vendasService.updateVenda(id, pessoa_id, valor_venda);
            res.json({ message: 'venda atualizado com sucesso' });

        } catch (error) {
            console.error('Erro ao editar dados dos vendas:', error);
            res.status(500).json({ error: 'Um erro ocorreu'});
        }
    },

    deleteVenda: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await vendasService.deleteVenda(id);
            if (result.affectedRows === 1) {
                res.json({ message: 'venda deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'venda não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar dados dos vendas:', error);
            res.status(500).json({ error: 'Um erro ocorreu'});
        }
    },
};

module.exports = vendasController;