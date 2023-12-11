const bcrypt = require("bcrypt");

const authUtils = {
    hashPassword: async (senha) => {
        try {
            const salt = await bcrypt.genSalt();
            return bcrypt.hash(senha, salt);
        } catch (erro) {
            console.log("Erro ao hashear a senha: ", erro);
        }
    },
};

module.exports = authUtils;
