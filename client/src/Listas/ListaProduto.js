import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import EditarModal from "../EditarModal";

const ListaDePessoas = ({}) => {
    const [produtosData, setPessoasData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [fields, setFields] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/produtos')
            .then((response) => response.json())
            .then((data) => setPessoasData(data.data))
            .catch((error) => console.error('Erro ao pegar os dados:', error));
    }, []);

    const handleOpenModal = (cidade) => {
        setModalData(cidade);
        setEditedData({ ...cidade });
        setShowModal(true);
    };

    const handleInputChange = (name, value) => {
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = async () => {
        try {
            const updatedData = {
                nome_produto: editedData.nome_produto,
                valor_produto: editedData.valor_produto,
            };

            parseFloat(updatedData.valor_produto)

            console.log(produtosData.id_produto)

            const response = await fetch(`http://localhost:8080/api/produtos/${editedData.id_produto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            console.log(updatedData)

            handleCloseModal();
            window.location.reload();

        } catch (error) {
            alert('Falha em atualizar os dados, certifique-se de que o código é um ID existente');
            console.error('Erro:', error);
        }
    };

    const handleDelete = (id_produto) => {
        fetch(`http://localhost:8080/api/produtos/${id_produto}`, {
            method: 'DELETE',
        })
            .then((response) => {
                setPessoasData((prevState) =>
                        prevState.filter((produto) => produto.id_produto !== id_produto)
                    );
                    window.location.reload();

            })
            .catch((error) => console.error('Erro ao deletar produto:', error));
    };

    useEffect(() => {
        const fieldsArray = [
            { label: 'ID', name: 'id_produto' },
            { label: 'Nome do produto', name: 'nome_produto' },
            { label: 'Valor do produto', name: 'valor_produto' },
        ];
        setFields(fieldsArray);
    }, []);

    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome do Produto</th>
                        <th>Valor do Produto</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtosData.map((produto) => (
                        <tr key={produto.id_produto}>
                            <td>{produto.id_produto}</td>
                            <td>{produto.nome_produto}</td>
                            <td>{parseFloat(produto.valor_produto).toFixed(2)}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(produto)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(produto.id_produto)}
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
            <Link to="/produtos" className="link-button">
                Incluir
            </Link>
            {showModal && (
                <EditarModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    fields={fields}
                    editedData={editedData}
                    handleSaveChanges={handleSaveChanges}
                    handleInputChange={handleInputChange}
                />
            )}
        </div>
    );
};

export default ListaDePessoas;
