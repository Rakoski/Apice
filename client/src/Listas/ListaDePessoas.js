import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import EditarModal from "../EditarModal";

const ListaDePessoas = () => {
    const [pessoasData, setPessoasData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [fields, setFields] = useState([]);
    const [cidadesData, setCidadesData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/pessoas')
            .then((response) => response.json())
            .then((data) => {
                const pessoaPromises = data.map((pessoa) => {
                    return fetch(`http://localhost:8080/api/cidades/${pessoa.cidade_id}`)
                        .then((response) => response.json())
                        .then((cidadeData) => {
                            pessoa.cidade_nome = cidadeData.data.cidade_nome;
                            return pessoa;
                        });
                });

                const cidadesPromises = data.map((pessoa) => {
                    return fetch(`http://localhost:8080/api/cidades`)
                        .then((response) => response.json())
                        .then((cidadesData) => {
                            return cidadesData;
                        });
                });

                Promise.all(pessoaPromises)
                    .then((pessoasWithCidadeNome) => {
                        setPessoasData(pessoasWithCidadeNome);
                    })
                    .catch((error) => {
                        console.error('Erro ao pegar os dados das cidades:', error);
                    });

                Promise.all(cidadesPromises)
                    .then((cidades) => {
                        setCidadesData(cidades);
                    })
                    .catch((error) => {
                        console.error('Erro ao pegar os dados das cidades:', error);
                    });
            })
            .catch((error) => {
                console.error('Erro ao pegar os dados das pessoas:', error);
            });
    }, []);

    const handleOpenModal = (id) => {
        const dataToDisplay = pessoasData.find((p) => p.id_pessoa === id);
        if (dataToDisplay) {
            setModalData(dataToDisplay);
            setEditedData({ ...dataToDisplay });
            setShowModal(true);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const cidadeNomeResponse = await fetch(`http://localhost:8080/api/cidades/${editedData.cidade_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cidade_nome: editedData.cidade_nome }),
            });

            const pessoaNomeResponse = await fetch(`http://localhost:8080/api/pessoas/${editedData.id_pessoa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pessoa_nome: editedData.pessoa_nome, telefone: editedData.telefone }),
            });

            handleCloseModal();
            fetch('http://localhost:8080/api/pessoas')
                .then((response) => response.json())
                .then((data) => {
                    setPessoasData(data);
                    window.location.reload();
                });

        } catch (error) {
            alert('Falha em atualizar os dados, certifique-se de que o código é um ID existente');
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
            { label: 'Código', name: 'id_pessoa' },
            { label: 'Nome', name: 'pessoa_nome' },
            { label: 'Cidade', name: 'cidade_nome' },
            { label: 'Telefone', name: 'telefone' },
        ];
        setFields(fieldsArray);
    }, []);

    const onDelete = async (id_pessoa) => {
        try {
            const response = await fetch(`http://localhost:8080/api/pessoas/${id_pessoa}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetch('http://localhost:8080/api/pessoas')
                    .then((response) => response.json())
                    .then((data) => {
                        setPessoasData(data);
                        window.location.reload();
                    });
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Cidade</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pessoasData.map((pessoa) => (
                        <tr key={pessoa.id_pessoa}>
                            <td>{pessoa.id_pessoa}</td>
                            <td>{pessoa.pessoa_nome}</td>
                            <td>{pessoa.cidade_nome}</td>
                            <td>{pessoa.telefone}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(pessoa.id_pessoa)}
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
                                        cidadeOptions={cidadesData}
                                        handleSaveChanges={handleSaveChanges}
                                        handleInputChange={handleInputChange}
                                    />
                                )}
                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(pessoa.id_pessoa)}
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
            <Link to="/pessoas" className="link-button">
                Incluir
            </Link>
        </div>
    );
};

export default ListaDePessoas;
