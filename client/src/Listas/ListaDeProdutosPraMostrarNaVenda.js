import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDeProdutosPraMostrarNaVenda.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarModal from '../EditarModal';

const ListaDeProdutosPraVenda = ({
 selectedProducts,
 updateSelectedProducts,
 onDeletar,
 fields,
 includeValorFields,
 updateSubTotal,
 updateSubTotalAndValorUnitario
 }) => {
    const [showModal, setShowModal] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/produtos')
            .then((response) => response.json())
            .then((data) => {
                setProdutos(data.data);
            });
    }, []);

    const handleOpenModal = (id) => {
        const productToEdit = selectedProducts.find((produto) => produto.id_venda === id);

        if (productToEdit) {
            setEditedData({ ...productToEdit });
            setSelectedProductId(id);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProductId(null);
        setEditedData({});
    };

    const handleSaveChanges = () => {
        const updatedProducts = [...selectedProducts];

        const productIndex = updatedProducts.findIndex((produto) => produto.id_venda === selectedProductId);

        if (productIndex !== -1) {
            updatedProducts[productIndex] = editedData;
            updateSelectedProducts(updatedProducts);
            handleCloseModal();
        }
    };

    const calculateSubTotalForItem = (produto) => {
        const quantidadeVenda = parseInt(produto.quantidadeVenda, 10) || 0;
        const valorUnitario = parseFloat(produto.valorUnitario);
        return quantidadeVenda * valorUnitario;
    };

    const handleInputChange = (fieldName, value) => {
        if (fieldName === 'produto') {
            const selectedProduto = produtos.find((produto) => produto.nome_produto === value);

            if (selectedProduto) {
                setEditedData((prevData) => ({
                    ...prevData,
                    produto: selectedProduto.nome_produto,
                }));

                const quantidadeVenda = parseInt(editedData.quantidadeVenda, 10) || 0;
                const valorUnitario = parseFloat(selectedProduto.valor_produto);

                const subTotal = valorUnitario * quantidadeVenda;
                updateSubTotal(subTotal);
                updateSubTotalAndValorUnitario(subTotal, valorUnitario); // Call the callback here
            }
        } else {
            setEditedData((prevData) => ({
                ...prevData,
                [fieldName]: value,
            }));
        }
    };

    useEffect(() => {
        const newTotal = selectedProducts.reduce((total, produto) => {
            return total + calculateSubTotalForItem(produto);
        }, 0);

        updateSubTotal(newTotal);
    }, [selectedProducts]);

    const calculateTotal = () => {
        return selectedProducts.reduce((total, produto) => total + parseFloat(produto.subTotal), 0);
    };

    return (
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
                    {selectedProducts.map((produto) => (
                        <tr key={produto.id_venda}>
                            {fields.map((field) => (
                                <td key={field.name}>{produto[field.name]}</td>
                            ))}
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(produto.id_venda)}
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
                    ))}
                    </tbody>
                </Table>
            </div>
            <div className="total-container">
                <span className="total-label">Total:</span>
                <span className="total-value">{`R$ ${calculateTotal().toFixed(2)}`}</span>
            </div>
            {showModal && (
                <EditarModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    editedData={editedData}
                    handleSaveChanges={handleSaveChanges}
                    handleInputChange={handleInputChange}
                    fields={fields}
                    produtos={produtos}
                    includeValorFields={includeValorFields}
                />
            )}
        </div>
    );
};

export default ListaDeProdutosPraVenda;
