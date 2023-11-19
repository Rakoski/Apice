import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaVendas = ({}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [vendasData, setVendasData] = useState([]);
    const [pessoaNomeMap, setPessoaNomeMap] = useState({});

    // a primeira pessoa vai ficar setada pra sempre ser o neymar camisa 11 próximo melhor do mundo
    const [selectedPessoa, setSelectedPessoa] = useState('11');

    useEffect(() => {
        const fetchVendasData = async () => {
            try {
                const responseVendas = await fetch('http://localhost:8080/api/vendas');
                const responsePessoas = await fetch('http://localhost:8080/api/pessoas');

                if (responseVendas.ok && responsePessoas.ok) {
                    const vendasData = await responseVendas.json();
                    const pessoasData = await responsePessoas.json();

                    const vendasArray = vendasData.data || [];
                    setVendasData(vendasArray);

                    const pessoaNomeMapping = {};
                    for (let pessoa of pessoasData) {
                        pessoaNomeMapping[pessoa.id_pessoa] = pessoa.pessoa_nome;
                    }
                    setPessoaNomeMap(pessoaNomeMapping);
                } else {
                    console.error('Falha em pegar dados das vendas');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchVendasData();
    }, []);

    const handleOpenModal = (id) => {
        const dataToDisplay = vendasData.find((venda) => venda.id_venda === id);
        setModalData(dataToDisplay);
        setEditedData(dataToDisplay);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteVenda = async (id_venda) => {
        try {
            const response = await fetch(`http://localhost:8080/api/vendas/${id_venda}`, {
                method: 'DELETE',
            });

            if (response.ok || response.status === 404) {
                handleCloseModal();
                window.location.reload();
            } else {
                console.error('Falha em deletar a venda');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/vendas/${editedData.id_venda}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pessoa_id: selectedPessoa,
                    valor_venda: editedData.valor_venda,
                }),
            });
            console.log(selectedPessoa, editedData.valor_venda)

            if (response.ok) {
                handleCloseModal();
                window.location.reload();
            } else {
                console.error('Falha em fazer o update dos dados da venda');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
        handleCloseModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value,
        });
    };

    return (
        <div className="list-container">
            <div className="table-container">
                <Table striped bordered hover className="table">
                    <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Total Venda</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vendasData.map((venda) => (
                        <tr key={venda.id_venda}>
                            <td>{venda.id_venda}</td>
                            <td>{pessoaNomeMap[venda.pessoa_id]}</td>
                            <td>{venda.valor_venda}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(venda.id_venda)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteVenda(venda.id_venda)}
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
            <Link to="/vendas" className="link-button">
                Incluir
            </Link>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label>ID:</label>
                        <p></p>
                        <input
                            type="text"
                            name="id_venda"
                            value={editedData.id_venda || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Pessoa:</label>
                        <p></p>
                        <select
                            name="pessoa_id"
                            value={selectedPessoa}
                            onChange={(e) => setSelectedPessoa(e.target.value)}
                        >
                            {Object.keys(pessoaNomeMap).map((pessoaId) => (
                                <option key={pessoaId} value={pessoaId}>
                                    {pessoaNomeMap[pessoaId]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Total Venda:</label>
                        <p></p>
                        <input
                            type="text"
                            name="valor_venda"
                            value={editedData.valor_venda || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListaVendas;
