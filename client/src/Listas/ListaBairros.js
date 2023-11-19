import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import EditarModal from '../EditarModal';

const ListaDeBairros = () => {
    const [bairosData, setBairosData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [fields, setFields] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/bairros')
            .then((response) => response.json())
            .then((data) => {
                setBairosData(data.data);
            })
            .catch((error) => {
                console.error('Erro ao pegar os dados dos bairros:', error);
            });
    }, []);

    const handleOpenModal = (id) => {
        const dataToDisplay = bairosData.find((p) => p.id_bairro === id);
        if (dataToDisplay) {
            setModalData(dataToDisplay);
            setEditedData({ ...dataToDisplay });
            setShowModal(true);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/bairros/${editedData.id_bairro}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (response.ok) {
                handleCloseModal();
                // eu pensava que o react já fazia isso automáticamente mas pelo jeito preciso atualizar pra que
                // as mudanças do banco de dados sejam passadas para a página, assim como é no JQuery
                window.location.reload();

            } else {
                alert('Falha em atualizar os dados, certifique-se de o código é um ID existente');
            }

        } catch (error) {
            console.error('Erro:', error);
        }
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

    useEffect(() => {
        const fieldsArray = [
            { label: 'ID', name: 'id_bairro' },
            { label: 'Nome do Bairro', name: 'bairro_nome' },
        ];
        setFields(fieldsArray);
    }, []);

    const onDeletar = async id_bairro => {
        try {
            const deleteData = {
                id_bairro: id_bairro,
                isDelete: true,
            };

            const response = await fetch(`http://localhost:8080/api/bairros/${id_bairro}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteData),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to delete neighborhood');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome do Bairro</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bairosData.map((bairro) => (
                        <tr key={bairro.id_bairro}>
                            <td>{bairro.id_bairro}</td>
                            <td>{bairro.bairro_nome}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(bairro.id_bairro)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
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
                                <Button
                                    variant="danger"
                                    onClick={() => onDeletar(bairro.id_bairro)}
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
            <Link to="/bairros" className="link-button">
                Incluir
            </Link>
        </div>
    );
};

export default ListaDeBairros;
