import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import './Venda.css';
import ListaDeProdutosPraVenda from '../Listas/ListaDeProdutosPraMostrarNaVenda';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

const fields = [
    { label: 'Código', name: 'id_produto' },
    { label: 'Nome', name: 'produto', isDropdown: true },
    { label: 'Quantidade', name: 'quantidadeVenda' },
    { label: 'Valor Unitário', name: 'valorUnitario' },
    { label: 'Sub Total', name: 'subTotal' },
];

// eu sei que esse componente ficou incrivelmente grande mas eu fiz ele desse jeito porque antes, com vários componentes
// e cada um com +- 100 linhas, tava dando muitos conflitos de dados e de variáveis, principalmente na hora de editar
// e na hora de cadastrar, com a função de calcular o total não sendo confiável, uma hora funcionando e outras não,
// então peço desculpas pra pessoa que for ter que analizar esse componente

function VendaComponent() {
    const [id_venda, setIdVenda] = useState('');
    const [dataVenda, setDataVenda] = useState('');
    const [produto, setProduto] = useState('Caderno 48 folhas tilibra');
    const [quantidadeVenda, setQuantidadeVenda] = useState('');
    const [pessoa, setPessoa] = useState('');
    const [selectedPessoaId, setSelectedPessoaId] = useState('7');
    const [pessoas, setPessoas] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [valorUnitario, setValorUnitario] = useState(12.48);
    const [subTotal, setSubTotal] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editedData, setEditedData] = useState({ id_produto: null, produto: '', quantidadeVenda: 0, valorUnitario: 0, subTotal: 0 });
    const [isPressed, setIsPressed] = useState(false);

    const buttonStyle = {
        backgroundColor: isPressed ? 'white' : 'green',
        color: isPressed ? 'green' : 'white',
        padding: '20px 50px',
        transition: 'background-color 0.3s, color 0.3s',
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/pessoas')
            .then((response) => response.json())
            .then((data) => setPessoas(data));

        fetch('http://localhost:8080/api/produtos')
            .then((response) => response.json())
            .then((data) => {
                setProdutos(data.data);
            });
    }, []);

    const onDeletar = (id) => {
        const itemIndex = selectedProducts.findIndex((produto) => produto.id_venda === id);

        if (itemIndex !== -1) {
            const updatedSelectedProducts = [...selectedProducts];
            updatedSelectedProducts.splice(itemIndex, 1);

            setSelectedProducts(updatedSelectedProducts);
        }
    };

    const onCancel = () => {
        setIdVenda('');
        setDataVenda('');
        setPessoa('7');
        setProduto('Caderno 48 folhas tilibra');
        setQuantidadeVenda('');
        setValorUnitario(0);
        setSubTotal(0);
        setSelectedProducts([]);
        setTotal(0);

        setShowModal(false);
    };

    const handleIdVendaChange = (e) => {
        setIdVenda(e.target.value);
    };

    const handleDataVendaChange = (e) => {
        const rawDate = e.target.value;
        const formattedDate = rawDate.replace(/-/g, '/');
        setDataVenda(formattedDate);
    };

    const handlePessoaChange = (e) => {
        const selectedPessoaNome = e.target.value;
        const selectedPessoaObj = pessoas.find((pessoa) => pessoa.pessoa_nome === selectedPessoaNome);

        if (selectedPessoaObj) {
            setPessoa(selectedPessoaNome);
            setSelectedPessoaId(selectedPessoaObj.id_pessoa);
        } else {
            setPessoa('');
            setSelectedPessoaId('');
            alert(`A pessoa "${selectedPessoaNome}" não foi encontrada na lista`);
        }
    };

    const handleProdutoChange = (e) => {
        const produtoSelecionado = e.target.value;
        const selectedProduto = produtos.find((produto) => produto.nome_produto === produtoSelecionado);

        if (selectedProduto) {
            const valorUnitario = parseFloat(selectedProduto.valor_produto);
            setProduto(produtoSelecionado);
            setValorUnitario(valorUnitario);
            calculateSubTotal(quantidadeVenda, valorUnitario);
        }
    };

    const calculateSubTotal = (quantidade, valorUnitario) => {
        const subTotalValue = (parseFloat(quantidade) * valorUnitario);
        setSubTotal(subTotalValue);
    };

    const handleQuantidadeVendaChange = (e) => {
        const quantidadeVenda = e.target.value;
        const newValue = parseInt(quantidadeVenda, 10);

        if (!isNaN(newValue)) {
            const newQuantidadeVenda = newValue >= 0 ? newValue : 0;
            setQuantidadeVenda(newQuantidadeVenda);
            calculateSubTotal(newQuantidadeVenda, valorUnitario);
        }
    };

    const handleInputChange = (field, value) => {
        const editedDataCopy = { ...editedData, [field]: value };

        if (field === 'produto' || field === 'quantidadeVenda') {
            const produtoSelecionado = editedDataCopy.produto;
            const selectedProduto = produtos.find((produto) => produto.nome_produto === produtoSelecionado);

            if (selectedProduto) {
                const valorUnitario = parseFloat(selectedProduto.valor_produto);
                const localSubTotal = calculateSubTotal(editedDataCopy.quantidadeVenda, valorUnitario);

                editedDataCopy.valorUnitario = valorUnitario;
                editedDataCopy.subTotal = localSubTotal;
            }
        }

        setEditedData(editedDataCopy);
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((total, produto) => {
            const quantidadeVenda = parseFloat(produto.quantidadeVenda);
            const valor_produto = parseFloat(produto.valorUnitario);

            if (!isNaN(quantidadeVenda) && !isNaN(valor_produto)) {
                const subTotal2 = quantidadeVenda * valor_produto;
                return total + subTotal2;
            } else {
                return total;
            }
        }, 0);
    };

    const handleAddToCart = () => {
        if (quantidadeVenda <= 0) {
            alert('Por favor digite uma quantidade válida.');
            return;
        }

        const venda = {
            id_venda,
            id_produto: produtos.find((p) => p.nome_produto === produto)?.id_produto,
            produto,
            quantidadeVenda,
            subTotal,
            valorUnitario,
        };

        const newTotal = total + subTotal;

        setSelectedProducts([...selectedProducts, venda]);
        setTotal(newTotal);

        setPessoa('');
        setProduto('');
        setQuantidadeVenda('');
        setValorUnitario(0);
        setSubTotal(0);
    };

    function convertToISODate(dateString) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return null;
    }
    
    const sendVendaRequest = async () => {
        if (!selectedPessoaId) {
            alert('Por favor, selecione uma pessoa válida.');
            return;
        }

        if (!dataVenda) {
            alert('Por favor, adicione uma data de venda.');
            return;
        }

        let total = parseFloat(calculateTotal().toFixed(2));

        const dataVendaFormatada = convertToISODate(dataVenda)

        const requestBody = {
            pessoa_id: selectedPessoaId,
            data_venda: dataVendaFormatada,
            valor_venda: total,
        };

        if (id_venda) {
            requestBody.id_venda = id_venda;
        }

        try {
            const response = await fetch('http://localhost:8080/api/vendas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setPessoa('');
                setSelectedPessoaId('');
                setTotal(0);

                await new Promise(resolve => setTimeout(resolve, 2000));

                const response = await fetch(`http://localhost:8080/api/vendas/${total}/${dataVendaFormatada}`);

                if (response.status === 200) {
                    const responseData = await response.json();
                    const idDaVendaPraCadastrarNoProduto = responseData.data.id_venda;
                    registerVendasProdutos(idDaVendaPraCadastrarNoProduto);
                } else {
                    console.error('Error while fetching data from the API');
                }

            } else {
                alert('Falha em registrar a venda');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    
    const registerVendasProdutos = async (vendaId) => {
        if (!selectedProducts || selectedProducts.length === 0) {
            alert('Por favor coloque produtos antes de registra-los.');
            return;
        }

        try {
            const vendaProdutosData = {
                venda_id: vendaId,
                produtos: selectedProducts.map((product) => product.id_produto),
            };
            console.log(vendaProdutosData)

            const response = await fetch('http://localhost:8080/api/vendas_produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vendaProdutosData),
            });

            if (response.ok) {
                alert('Produtos registrados para a venda com sucesso!.');
                setSelectedProducts([]);
            } else {
                alert('Falha em registrar os produtos na venda.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOpenModal = (index) => {
        const productToEdit = selectedProducts[index];

        if (productToEdit) {
            setEditedData({ ...productToEdit });
            setShowModal(true);
        }
    };

    const handleSaveChanges = () => {
        if (editedData.id_produto !== null) {
            const updatedProducts = [...selectedProducts];
            const productIndex = updatedProducts.findIndex((produto) => produto.id_produto === editedData.id_produto);

            if (productIndex !== -1) {
                updatedProducts[productIndex] = editedData;
                updateSelectedProducts(updatedProducts);
                handleCloseModal();
            }
        }
    };

    const updateSelectedProducts = (updatedProducts) => {
        setSelectedProducts(updatedProducts);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditedData({});
    };

    return (
        <div className="venda-container">
            <div className="venda-row" onClick={handleCloseModal}>
                <div className="venda-field">
                    <label className="venda-label">Código (id):</label>
                    <input type="text" className="venda-input" value={id_venda} onChange={handleIdVendaChange} />
                </div>
                <div className="venda-field">
                    <label className="venda-label">Data Venda:</label>
                    <InputMask
                        mask="99/99/9999"
                        placeholder="DD/MM/YYYY"
                        className="venda-input"
                        value={dataVenda}
                        onChange={handleDataVendaChange}
                    />
                </div>
                <div className="venda-field">
                    <label className="venda-label">Pessoa:</label>
                    <select className="venda-input" value={pessoa} onChange={handlePessoaChange}>
                        {pessoas.map((pessoa) => (
                            <option key={pessoa.id_pessoa} value={pessoa.pessoa_nome}>
                                {pessoa.pessoa_nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="venda-row">
                <div className="venda-field">
                    <label className="venda-label">Produto:</label>
                    <select className="venda-input" value={produto} onChange={handleProdutoChange}>
                        {produtos.map((produto) => (
                            <option key={produto.id_produto} value={produto.nome_produto}>
                                {produto.nome_produto}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="venda-field">
                    <label className="venda-label">Quantidade Venda:</label>
                    <input
                        type="number"
                        className="venda-input"
                        value={quantidadeVenda}
                        onChange={handleQuantidadeVendaChange}
                        min="0"
                    />
                </div>
                <div className="venda-field">
                    <label className="venda-label">Valor Unitário</label>
                    <span className="venda-value">{`:  R$${valorUnitario.toFixed(2)}`}</span>
                </div>
                <div className="venda-field">
                    <label className="venda-label">Sub Total</label>
                    <label className="venda-value">{`:  R$${subTotal}`}</label>
                </div>
                <div className="venda-field">
                    <button className="venda-button" onClick={handleAddToCart}>
                        <img
                            src={process.env.PUBLIC_URL + '/carrinho-png.png'}
                            alt="Carrinho"
                            className="venda-icon"
                            style={{ width: '30px', height: '30px' }}
                        />
                    </button>
                </div>

                <div className="list-container">
                    <div className="table-container">
                        <Table striped bordered hover className="table">
                            <thead>
                            <tr>
                                {fields.map((field) => (
                                    <th key={field.name}>{field.label}</th>
                                ))}
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedProducts.map((produto, index) => {
                                const { id_produto, produto: nome_produto, quantidadeVenda, valorUnitario: valor_produto } = produto;
                                const subTotal2 = quantidadeVenda * valor_produto;

                                return (
                                    <tr key={produto.id_venda}>
                                        <td>{id_produto}</td>
                                        <td>{nome_produto}</td>
                                        <td>{quantidadeVenda}</td>
                                        <td>{valor_produto}</td>
                                        <td>{subTotal2}</td>
                                        <td className="actions-column">
                                            <Button
                                                variant="warning"
                                                onClick={() => handleOpenModal(index)}
                                                className="edit-button"
                                            >
                                                <FaEdit className="fa-edit" /> Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => onDeletar(produto.id_venda)}
                                                className="delete-button"
                                            >
                                                <FaTrash className="fa-trash" /> Deletar
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Produto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Produto</Form.Label>
                                        <select
                                            className="venda-input"
                                            value={editedData.produto}
                                            onChange={(e) => handleInputChange('produto', e.target.value)}
                                        >
                                            {produtos.map((produto) => (
                                                <option key={produto.id_produto} value={produto.nome_produto}>
                                                    {produto.nome_produto}
                                                </option>
                                            ))}
                                        </select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Quantidade Venda</Form.Label>
                                        <input
                                            type="number"
                                            className="venda-input"
                                            value={editedData.quantidadeVenda}
                                            onChange={(e) => handleInputChange('quantidadeVenda', e.target.value)}
                                            min="0"
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={handleSaveChanges}>
                                Salvar Alterações
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="total-container">
                        <span className="total-label">Total:</span>
                        <span className="total-value">{`R$ ${calculateTotal().toFixed(2)}`}</span>
                    </div>
                </div>

                <div className="button-container">
                    <button
                        style={buttonStyle}
                        onClick={sendVendaRequest}
                        className="edit-button"
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                    >
                        Confirmar
                    </button>
                    <button
                        style={{ backgroundColor: 'red', color: 'white', padding: '20px 50px' }}
                        className="delete-button"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VendaComponent;
