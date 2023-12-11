const express = require("express")
const router = express.Router();
const produtosController = require("../controllers/produtos.controller");
const bairroController = require("../controllers/bairro.controller");
const cidadeController = require("../controllers/cidade.controller")
const pessoaController = require("../controllers/pessoa.controller")
const vendaController = require("../controllers/venda.controller")
const vendaServicoController = require("../controllers/vendaProduto.controller")
const usuarioController = require("../controllers/usuario.controller")

router.get("/produtos", produtosController.getProdutos)
router.post("/produtos", produtosController.postProduto)
router.get("/produtos/:id", produtosController.getProdutoById)
router.put("/produtos/:id", produtosController.putProduto)
router.delete("/produtos/:id", produtosController.deleteProduto)

router.get("/bairros", bairroController.getBairros)
router.post("/bairros", bairroController.postBairro)
router.get("/bairros/:id", bairroController.getBairroById)
router.get("/bairros/nome/:bairro_nome", bairroController.getBairroByNome)
router.put("/bairros/:id", bairroController.putBairro)
router.delete("/bairros/:id", bairroController.deleteBairro)

router.get("/cidades", cidadeController.getCidades)
router.post("/cidades", cidadeController.postCidade)
router.get("/cidades/:id", cidadeController.getCidadeById)
router.get("/cidades/nome/:cidade_nome", cidadeController.getCidadeByNome)
router.put("/cidades/:id", cidadeController.putCidade)
router.delete("/cidades/:id", cidadeController.deleteCidade)

router.post("/pessoas", pessoaController.createPessoa)
router.get("/cidades", pessoaController.getPessoa)
router.get("/cidades/:id", pessoaController.getPessoaById)
router.put("/cidades/:id", pessoaController.updatePessoa)
router.delete("/cidades/:id", pessoaController.deletePessoa)

router.post("/pessoas", pessoaController.createPessoa)
router.get("/pessoas", pessoaController.getPessoa)
router.get("/pessoas/:id", pessoaController.getPessoaById)
router.put("/pessoas/:id", pessoaController.updatePessoa)
router.delete("/pessoas/:id", pessoaController.deletePessoa)

router.post("/vendas", vendaController.postVenda)
router.get("/vendas", vendaController.getVendas)
router.get("/vendas/:id", vendaController.getVendaById)
router.get("/vendas/:valor_venda/:data_venda", vendaController.getVendaIdByInfo)
router.get("/vendas/datas/:data_inicial/:data_final", vendaController.getVendaDates);
router.put("/vendas/:id", vendaController.putVenda)
router.delete("/vendas/:id", vendaController.deleteVenda)

router.post("/vendas_produtos", vendaServicoController.postVendaProduto)
router.get("/vendas_produtos", vendaServicoController.getVendaProdutos)
router.get("/vendas_produtos/:id", vendaServicoController.getVendaProdutoById)
router.get("/vendas_produtos/produto/:produto_id", vendaServicoController.getVendasByIdProduto);
router.put("/vendas_produtos/:id", vendaServicoController.putVendaProduto)
router.delete("/vendas_produtos/:id", vendaServicoController.deleteVendaProduto)

router.post("/login", usuarioController.loginUsuario)
router.get("/usuarios", usuarioController.getUsuarios)
router.post("/usuarios", usuarioController.postUsuario)
router.get("/usuarios/:id", usuarioController.getUsuarioById)
router.get("/usuarios/email/:email", usuarioController.getUsuarioByEmail)
router.put("/usuarios/:id", usuarioController.putUsuario)
router.delete("/usuarios/:id", usuarioController.deleteUsuario)

module.exports = router