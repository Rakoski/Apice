import React, { useState } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroPessoa = () => {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [valor, setValorProduto] = useState('');

    const handleConfirmar = async () => {
        try {
            const formData = {
                id_produto: codigo,
                nome_produto: nome,
                valor_produto: valor
            };

            parseFloat(formData.valor_produto)

            const response = await fetch('http://localhost:8080/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(formData)

            if (response.ok) {
                alert('Produto registrada com sucesso!');
                handleCancelar();
            } else {
                alert('Falha ao registrar o Produto. Verifique os campos e tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    const handleCancelar = () => {
        setCodigo('');
        setNome('');
        setValorProduto('');
    };

    return (
        <div className="cadastro-pessoa-container">
            <h1>Cadastro de Produto</h1>
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
                    <label>Nome do Produto:</label>
                    <input
                        type="text"
                        className="nome-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Valor de Venda:</label>
                    <input
                        type="text"
                        className="nome-input small-input"
                        value={valor}
                        onChange={(e) => setValorProduto(e.target.value)}
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
                <Link to="/lista de produtos">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar Produtos
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroPessoa;
