import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroBairro = () => {
    const [codigo, setCodigo] = useState('');
    const [bairro_nome, setBairro_nome] = useState('');

    const handleConfirmar = () => {
        const formData = {
            bairro_nome: bairro_nome,
            id_bairro: codigo
        };
        const jsonData = JSON.stringify(formData);

        fetch('http://localhost:8080/api/bairros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Resposta não foi ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Bairro criado com sucesso!');
            })
            .catch(error => {
                console.error('Erro: ', error);
                alert("Código já existente, por favor, insira outro.")
            });
    };

    const handleCancelar = () => {
        setCodigo('');
        setBairro_nome('');
    };

    return (
        <div className="cadastro-pessoa-container">
            <h1>Cadastro de Bairro</h1>
            <div className="form-row">
                <div className="form-group">
                    <label>Código:</label>
                    <input
                        type="text"
                        className="codigo-input"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nome do Bairro:</label>
                    <input
                        type="text"
                        className="nome-input"
                        value={bairro_nome}
                        onChange={(e) => setBairro_nome(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-container">
                <button className="cancel-button" onClick={handleCancelar}>
                    Cancelar
                </button>
                <button className="confirm-button" onClick={handleConfirmar}>
                    Confirmar
                </button>
                <Link to="/lista de bairros">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar Bairros
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroBairro;
