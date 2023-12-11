const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const authUtils = require('./auth/authUtils')
const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);
const Usuario = require('../models/usuario')(sequelize, DataTypes);

const usuarioServico = {
    getUsuarios: async () => {
        try {
            return await Usuario.findAll();
        } catch (error) {
            throw error;
        }
    },

    getUsuarioById: async (id) => {
        try {
            const usuario = await Usuario.findOne({ where: { id_usuario: id } });
            return usuario;
        } catch (error) {
            throw error;
        }
    },

    getUsuarioByUsuarioEmail: async (usuario_email) => {
        try {
            const usuario = await Usuario.findOne({ where: { usuario_email: usuario_email } });
            return usuario;
        } catch (error) {
            throw error;
        }
    },

    createUsuario: async (usuario_nome, usuario_sobrenome, usuario_email, usuario_senha) => {
        try {

            const senhaPraInserirNaDB = await authUtils.hashPassword(usuario_senha)

            console.log(usuario_senha)

            const usuarioData = {
                usuario_nome, usuario_sobrenome, usuario_email, usuario_senha: senhaPraInserirNaDB
            };

            return await Usuario.create(usuarioData);
        } catch (error) {
            throw error;
        }
    },

    loginDoUsuario: async (usuario_email, senha) => {
        const usuarioPego = await Usuario.findOne({ where: { usuario_email: usuario_email } })

        console.log(usuarioPego)

        try {
            if (await bcrypt.compare(senha, usuarioPego.usuario_senha)) {
                return { message: "Usuário logado com sucesso!" }
            }
        } catch (erro) {
            console.error("Erro no Login do usuário: ", erro)
        }
    },

    updateUsuario: async (id, usuario_nome, usuario_sobrenome, usuario_email, usuario_senha) => {
        try {
            usuario_senha = authUtils.hashPassword(usuario_senha)

            const [updatedRowsCount] = await Usuario.update(
                { usuario_nome, usuario_sobrenome, usuario_email, usuario_senha },
                { where: { id_usuario: id } }
            );

            if (updatedRowsCount === 1) {
                return { message: 'Usuario atualizado com sucesso' };
            }
        } catch (error) {
            throw error;
        }
    },

    deleteUsuario: async (id) => {
        try {
            const deletedRowCount = await Usuario.destroy({ where: { id_usuario: id } });

            if (deletedRowCount === 1) {
                return { message: 'Usuario deletado com sucesso' };
            }
        } catch (error) {
            throw error;
        }
    },

};

module.exports = usuarioServico;
