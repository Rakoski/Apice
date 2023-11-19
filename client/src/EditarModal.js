import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditarModal = ({ produtos, showModal, handleCloseModal, fields, editedData, handleSaveChanges, handleInputChange }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {fields.map((field, index) => (
                    <div key={index} className="input-field">
                        <label>{field.label}:</label>
                        {field.name === 'produto' ? (
                            <select
                                name={field.name}
                                value={editedData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="form-control"
                            >
                                {produtos.map((produto) => (
                                    <option key={produto.id_produto} value={produto.nome_produto}>
                                        {produto.nome_produto}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                value={editedData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="form-control"
                            />
                        )}
                    </div>
                ))}
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
    );
};

export default EditarModal;
