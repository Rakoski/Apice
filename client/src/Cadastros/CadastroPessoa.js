import React, { useState, useEffect } from 'react';
import './CadastroPessoa.css';
import { Link } from 'react-router-dom';

const CadastroPessoa = () => {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');

    // vou deixar os 2 aqui como 16 e 1 pois 16 seria "Jardins" e 1 seria "Ipanema" aka os bairros selecionados
    // no começo se o usuário não selecionar nenhum outro pra evitar que uma requisição seja mandada sem nada
    const [cidade, setCidade] = useState('16');
    const [bairro, setBairro] = useState('1');

    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [cidadesData, setCidadesData] = useState([]);
    const [bairrosData, setBairrosData] = useState([]);

    const isTelefoneValido = (telefone) => {

        // isso aqui diz que tem q ser assim: +xx (xx) xxxxx-xxxx ou assim: (xx) xxxxx-xxxx
        const formatoValido = /^\+(?:\d{2} )?\(\d{2}\) \d{5}-\d{4}$|^\(\d{2}\) \d{5}-\d{4}$/;
        return formatoValido.test(telefone);
    };

    const isCepValido = (cep) => {

        // isso aqui diz que tem q ser assim: xxxxx-xxx
        const formatoValido = /^\d{5}-\d{3}$/;
        return formatoValido.test(cep);
    };

    const isEmailValido = (email) => {

        // já isso diz que o email tem que tem pelo menos um "@" e um "."
        const formatoValido = /\S+@\S+\.\S+/;
        return formatoValido.test(email);
    };

    // primeiro vou pegar os bairros e as cidades pra mostrarem os registrados no dropdown,
    // caso contrário precisa registrar eles primeiro, daí só depois que a gente consegue mandar a requisição POST
    useEffect(() => {
        fetch('http://localhost:8080/api/cidades')
            .then((response) => response.json())
            .then((data) => {
                setCidadesData(data);
            })
            .catch((error) => {
                console.error('Erro ao pegar os dados das cidades:', error);
            });

        fetch('http://localhost:8080/api/bairros')
            .then((response) => response.json())
            .then((data) => {
                setBairrosData(data);
            })
            .catch((error) => {
                console.error('Erro ao pegar os dados dos bairros:', error);
            });
    }, []);


    const handleConfirmar = async () => {
        if (!isTelefoneValido(telefone)) {
            alert('Telefone inválido. Use o formato +xx (xx) xxxxx-xxxx ou (xx) xxxxx-xxxx.');
            return;
        }

        if (!isCepValido(cep)) {
            alert('CEP inválido. Use o formato xxxxx-xxx.');
            return;
        }

        if (!isEmailValido(email)) {
            alert('Email inválido. Certifique-se de que o email realmente existe.');
            return;
        }

        try {
            const formData = {
                id_pessoa: codigo,
                pessoa_nome: nome,
                cidade_id: cidade,
                bairro_id: bairro,
                cep,
                endereco,
                numero,
                complemento,
                telefone,
                email,
            };

            const response = await fetch('http://localhost:8080/api/pessoas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Pessoa registrada com sucesso!');
                handleCancelar();
            } else {
                alert('Falha ao registrar a pessoa. Verifique os campos e tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleCancelar = () => {
        setCodigo('');
        setNome('');
        setCidade('');
        setBairro('');
        setCep('');
        setEndereco('');
        setNumero('');
        setComplemento('');
        setTelefone('');
        setEmail('');
    };

    return (
        <div className="cadastro-pessoa-container">
            <h1>Cadastro de Pessoa</h1>
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
                    <label>Nome:</label>
                    <input
                        type="text"
                        className="nome-input"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Cidade:</label>
                    <select
                        className="cidade-select"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    >
                        {cidadesData.data?.map((cidadeItem) => (
                            <option key={cidadeItem.id_cidade} value={cidadeItem.id_cidade}>
                                {cidadeItem.cidade_nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Bairro:</label>
                    <select
                        className="bairro-select"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                    >
                        {bairrosData.data?.map((bairroItem) => (
                            <option key={bairroItem.id_bairro} value={bairroItem.id_bairro}>
                                {bairroItem.bairro_nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>CEP:</label>
                    <input
                        type="text"
                        className="cep-input"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Endereço:</label>
                    <input
                        type="text"
                        className="endereco-input"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Número:</label>
                    <input
                        type="text"
                        className="numero-input"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Complemento:</label>
                    <input
                        type="text"
                        className="complemento-input"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Telefone:</label>
                    <input
                        type="text"
                        className="telefone-input"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        className="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <Link to="/lista de pessoas">
                    <button className="list-button" style={{ fontSize: '15px' }}>
                        Listar Pessoas
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CadastroPessoa;