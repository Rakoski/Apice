import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './FiltroPessoas.css';

const FiltroPessoas = () => {
    const [filtroNome, setFiltroNome] = useState('');
    const [filtroCidade, setFiltroCidade] = useState('');
    const [filtroBairro, setFiltroBairro] = useState('');
    const [resultados, setResultados] = useState([]);
    const [filtrosAtivos, setFiltrosAtivos] = useState(false);
    const [pessoasData, setPessoasData] = useState([]);
    const [cidadeNomes, setCidadeNomes] = useState({});
    const [bairroNomes, setBairroNomes] = useState({});

    async function fetchCidadeNome(id_cidade) {
        try {
            const response = await fetch(`http://localhost:8080/api/cidades/${id_cidade}`);
            if (response.ok) {
                const data = await response.json();
                setCidadeNomes((prevCidadeNomes) => ({
                    ...prevCidadeNomes,
                    [id_cidade]: data.data.cidade_nome,
                }));
                return data.data.cidade_nome;
            } else {
                console.error('Erro ao pegar cidade_nome');
                return null;
            }
        } catch (error) {
            console.error('Erro ao pegar cidade_nome:', error);
            return null;
        }
    }

    async function fetchBairroNome(id_bairro) {
        try {
            const response = await fetch(`http://localhost:8080/api/bairros/${id_bairro}`);
            if (response.ok) {
                const data = await response.json();
                setBairroNomes((prevBairroNomes) => ({
                    ...prevBairroNomes,
                    [id_bairro]: data.data.bairro_nome,
                }));
                return data.data.bairro_nome;
            } else {
                console.error('Erro ao pegar bairro_nome');
                return null;
            }
        } catch (error) {
            console.error('Erro ao pegar bairro_nome:', error);
            return null;
        }
    }

    const fetchBairroData = async (bairroNome) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bairros/nome/${bairroNome}`);
            if (!response.ok) {
                console.error('Erro ao pegar o id do bairro');
            }
            const bairrosData = await response.json();
            return bairrosData.data.id_bairro;
        } catch (error) {
            console.error('Erro ao pegar os dados do bairro: ', error);
            return null;
        }
    };

    const fetchCidadeData = async (cidadeNome) => {
        try {
            const response = await fetch(`http://localhost:8080/api/cidades/nome/${cidadeNome}`);
            if (!response.ok) {
                console.error('Erro ao pegar o id da cidade');
            }
            const cidadesData = await response.json();
            return cidadesData.data.id_cidade;
        } catch (error) {
            console.error('Erro ao pegar os dados da cidade: ', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pessoasResponse = await fetch('http://localhost:8080/api/pessoas');
                if (!pessoasResponse.ok) {
                    console.error('Falha em pegar os dados');
                }
                const pessoasData = await pessoasResponse.json();
                setPessoasData(pessoasData);

                const promises = pessoasData.map(async (pessoa) => {
                    const idPessoa = pessoa.id_pessoa;
                    try {
                        const eachPersonResponse = await fetch(`http://localhost:8080/api/pessoas/${idPessoa}`);
                        if (eachPersonResponse.ok) {
                            const eachPersonData = await eachPersonResponse.json();

                            const idBairro = eachPersonData.bairro_id
                            const idCidade = eachPersonData.cidade_id

                            const cidadeNome = await fetchCidadeNome(idCidade);
                            const bairroNome = await fetchBairroNome(idBairro);

                        } else {
                            console.error('Erro em pegar os dados de cada usuário');
                        }
                    } catch (error) {
                        console.error('Erro em pegar os dados de cada usuário', error);
                    }
                });

                await Promise.all(promises);
            } catch (error) {
                console.error('Erro ao pegar os dados:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const filtroAtivo =
            filtroNome.trim() !== '' ||
            filtroCidade.trim() !== '' ||
            filtroBairro.trim() !== '';

        setFiltrosAtivos(filtroAtivo);

        const filterData = async () => {
            let filteredPessoas = pessoasData;

            if (filtroBairro.trim() !== '') {
                const bairroId = await fetchBairroData(filtroBairro);
                filteredPessoas = filteredPessoas.filter((pessoa) => pessoa.bairro_id === bairroId);
            }

            if (filtroCidade.trim() !== '') {
                const cidadeId = await fetchCidadeData(filtroCidade);
                filteredPessoas = filteredPessoas.filter((pessoa) => pessoa.cidade_id === cidadeId);
            }

            if (filtroNome.trim() !== '') {
                filteredPessoas = filteredPessoas.filter((pessoa) =>
                    pessoa.pessoa_nome.toLowerCase().includes(filtroNome.toLowerCase())
                );
            }

            setResultados(filteredPessoas);
        };
        filterData();
    }, [filtroNome, filtroCidade, filtroBairro, pessoasData]);

    return (
        <div className="list-container">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cidade"
                    value={filtroCidade}
                    onChange={(e) => setFiltroCidade(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={filtroBairro}
                    onChange={(e) => setFiltroBairro(e.target.value)}
                />
                <Button>
                    <FaSearch /> Filtrar
                </Button>
            </div>
            {filtrosAtivos && resultados.length > 0 ? (
                <div className="table-container">
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Telefone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resultados.map((pessoa) => (
                            <tr key={pessoa.id_pessoa}>
                                <td>{pessoa.id_pessoa}</td>
                                <td>{pessoa.pessoa_nome}</td>
                                <td>{cidadeNomes[pessoa.cidade_id]}</td>
                                <td>{pessoa.telefone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : null}
        </div>
    );
};

export default FiltroPessoas;
