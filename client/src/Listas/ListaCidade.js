import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ListaDePessoas.css';
import { Link } from 'react-router-dom';
import EditarModal from "../EditarModal";

const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const ListaDeCidades = ({}) => {
    const [cidadesData, setCidadesData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [editedData, setEditedData] = useState({});
    const [fields, setFields] = useState([]);
    const [cidadesDoEstadoSelecionado, setCidadesDoEstadoSelecionado] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/cidades')
            .then((response) => response.json())
            .then((data) => {
                setCidadesData(data.data);
            })
            .catch((error) => {
                console.error('Erro ao pegar os dados das cidades:', error);
            });
    }, []);


    const handleOpenModal = (cidade) => {
        setModalData(cidade);
        setEditedData({ ...cidade });

        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${cidade.sigla_uf}/municipios`)
            .then((response) => response.json())
            .then((data) => {
                const nomesCidades = data.map((cidade) => cidade.nome);
                setCidadesDoEstadoSelecionado(nomesCidades);
            })
            .catch((error) => {
                console.error('Erro ao buscar as cidades do estado:', error);
            });

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
                cidade_nome: editedData.cidade_nome,
                sigla_uf: editedData.sigla_uf,
            };

            const response = await fetch(`http://localhost:8080/api/cidades/${editedData.id_cidade}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            handleCloseModal();
            window.location.reload();

        } catch (error) {
            alert('Falha em atualizar os dados, certifique-se de que o código é um ID existente');
            console.error('Erro:', error);
        }
    };


    const handleDelete = async (id_cidade) => {
        try {
            const deleteData = {
                id_cidade: id_cidade,
                isDelete: true,
            };

            const response = await fetch(`http://localhost:8080/api/cidades/${id_cidade}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteData),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Falha em deletar cidade');
                window.location.reload();
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    useEffect(() => {
        const fieldsArray = [
            { label: 'ID', name: 'id_cidade' },
            { label: 'Nome da cidade', name: 'cidade_nome' },
            { label: 'Sigla UF', name: 'sigla_uf' },
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
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cidadesData.map((cidade) => (
                        <tr key={cidade.id_cidade}>
                            <td>{cidade.id_cidade}</td>
                            <td>{cidade.cidade_nome}</td>
                            <td>{cidade.sigla_uf}</td>
                            <td className="actions-column">
                                <Button
                                    variant="warning"
                                    onClick={() => handleOpenModal(cidade)}
                                    className="edit-button"
                                >
                                    <FaEdit className="fa-edit" /> Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(cidade.id_cidade)}
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
            <Link to="/cidades" className="link-button">
                Incluir
            </Link>
            {showModal && (
                <EditarModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    fields={fields}
                    editedData={editedData}
                    handleSaveChanges={() => handleSaveChanges(editedData)}
                    handleInputChange={handleInputChange}
                    brazilianStates={brazilianStates}
                />
            )}
        </div>
    );
};


export default ListaDeCidades;
