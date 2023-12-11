const usuariosService = require("../services/servicoUsuario")

const usuariosController = {

    getUsuarios: async (req, res) => {
        try {
            const data = await usuariosService.getUsuarios();
            res.json({ data });
        } catch (error) {
            console.error("Erro ao pegar dados do banco de dados:", error);
            res.status(500).json({ error: "Um erro ocorreu"});
        }
    },

    getUsuarioById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await usuariosService.getUsuarioById(id);
            res.json({ data });
        } catch (error) {
            console.error("Erro pegar dados por Id:", error);
            res.status(500).json({ error: "Um erro ocorreu"});
        }
    },

    getUsuarioByEmail: async (req, res) => {
        try {
            const { usuario_email } = req.params;
            const data = await usuariosService.getUsuarioByUsuarioEmail(usuario_email);

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


    postUsuario: async (req, res) => {
        try {
            const { usuario_nome, usuario_sobrenome, usuario_email, usuario_senha } = req.body;

            const result = await usuariosService.createUsuario(usuario_nome, usuario_sobrenome, usuario_email, usuario_senha);

            if (result.affectedRows === 1 || res.status(200)) {
                res.status(201).json({message: 'usuario criado com sucesso'});
            } else {
                res.status(500).json({ error: 'Erro ao inserir dados na tabela usuario' });
            }
        } catch (error) {
            console.error('Erro ao inserir dados na tabela usuario:', error);
            res.status(500).json({ error: 'Um erro ocorreu'});
        }
    },

    loginUsuario: async (req, res) => {
        try {
            const { usuario_email, usuario_senha } = req.body;

            const result = await usuariosService.loginDoUsuario(usuario_email, usuario_senha);

            if (result && result.message === "Usuário logado com sucesso!") {
                res.status(200).json({ success: true, message: result.message });
            } else {
                res.status(401).json({ success: false, message: "Credenciais inválidas." });
            }
        } catch (error) {
            console.error("Erro no login do usuário: ", error);
            res.status(500).json({ success: false, message: "Erro no servidor." });
        }
    },


    putUsuario: async (req, res) => {
        try {
            const { usuario_nome, usuario_sobrenome, usuario_email, usuario_senha } = req.body;
            const { id } = req.params;
            await usuariosService.updateUsuario(id, usuario_nome, usuario_sobrenome, usuario_email, usuario_senha);
            res.json({ message: 'usuario atualizado com sucesso' });

        } catch (error) {
            console.error('Erro ao editar dados dos usuarios:', error);
            res.status(500).json({ error: 'Um erro ocorreu'});
        }
    },

    deleteUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await usuariosService.deleteUsuario(id);
            if (result.affectedRows === 1) {
                res.json({ message: 'usuario deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'usuario não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar dados dos usuarios:', error);
            res.status(500).json({ error: 'Um erro ocorreu'});
        }
    },
};

module.exports = usuariosController;