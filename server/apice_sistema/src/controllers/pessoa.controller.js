const pessoaService = require('../services/servicoPessoa'); // Import the PessoaService

class PessoaController {
    async createPessoa(req, res) {
        try {
            const newPessoaData = req.body;
            const createdPessoa = await pessoaService.createPessoa(newPessoaData);
            res.status(201).json(createdPessoa);
        } catch (error) {
            console.error('Error creating pessoa:', error);
            res.status(500).json({ error: 'Failed to create pessoa' });
        }
    }

    async getPessoa(req, res) {
        try {
            const pessoas = await pessoaService.getPessoas();
            res.status(200).json(pessoas);
        } catch (error) {
            console.error('Error fetching pessoas:', error);
            res.status(500).json({ error: 'Failed to fetch pessoas' });
        }
    }

    async getPessoaById(req, res) {
        try {
            const pessoaId = req.params.id;
            const pessoa = await pessoaService.getPessoaById(pessoaId);
            if (!pessoa) {
                res.status(404).json({ error: 'Pessoa not found' });
            } else {
                res.status(200).json(pessoa);
            }
        } catch (error) {
            console.error('Error fetching pessoa by ID:', error);
            res.status(500).json({ error: 'Failed to fetch pessoa by ID' });
        }
    }

    async updatePessoa(req, res) {
        try {
            const pessoaId = req.params.id;
            const updatedPessoaData = req.body;
            const updatedPessoa = await pessoaService.updatePessoa(pessoaId, updatedPessoaData);
            if (!updatedPessoa) {
                res.status(404).json({ error: 'Pessoa not found' });
            } else {
                res.status(200).json(updatedPessoa);
            }
        } catch (error) {
            console.error('Error updating pessoa:', error);
            res.status(500).json({ error: 'Failed to update pessoa' });
        }
    }

    async deletePessoa(req, res) {
        try {
            const pessoaId = req.params.id;
            const deletedPessoa = await pessoaService.deletePessoa(pessoaId);
            if (!deletedPessoa) {
                res.status(404).json({ error: 'Pessoa not found' });
            } else {
                res.status(204).json();
            }
        } catch (error) {
            console.error('Error deleting pessoa:', error);
            res.status(500).json({ error: 'Failed to delete pessoa' });
        }
    }
}

module.exports = new PessoaController();
