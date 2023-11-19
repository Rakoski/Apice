import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
import './FiltroPessoas.css';
import InputMask from "react-input-mask";
import {addDays, format} from 'date-fns';

const FiltroVendas = () => {
    const [vendasData, setVendasData] = useState([]);
    const [pessoasData, setPessoasData] = useState([]);
    const [pessoaNames, setPessoaNames] = useState({});
    const [produtosData, setProdutosData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filtroDataInicial, setFiltroDataInicial] = useState('');
    const [filtroDataFinal, setFiltroDataFinal] = useState('');
    const [selectedPessoa, setSelectedPessoa] = useState('');
    const [selectedProduto, setSelectedProduto] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendasResponse = await fetch('http://localhost:8080/api/vendas');
                if (!vendasResponse.ok) {
                    console.error('Erro ao pegar os dados das vendas');
                }
                const vendasData = await vendasResponse.json();
                setVendasData(vendasData.data);
            } catch (error) {
                console.error('Erro ao pegar os dados:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pessoasResponse = await fetch('http://localhost:8080/api/pessoas');
                if (!pessoasResponse.ok) {
                    console.error('Erro ao pegar os dados das pessoas');
                }
                const pessoasData = await pessoasResponse.json();
                setPessoasData(pessoasData);

                const pessoaNamesMap = {};
                pessoasData.forEach((pessoa) => {
                    pessoaNamesMap[pessoa.id_pessoa] = pessoa.pessoa_nome;
                });
                setPessoaNames(pessoaNamesMap);
            } catch (error) {
                console.error('Erro ao pegar os dados das pessoas:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produtosResponse = await fetch('http://localhost:8080/api/produtos');
                if (!produtosResponse.ok) {
                    console.error('Erro ao pegar os dados dos produtos');
                }
                const produtosData = await produtosResponse.json();
                setProdutosData(produtosData.data);
            } catch (error) {
                console.error('Erro ao pegar os dados dos produtos:', error);
            }
        };

        fetchData();
    }, []);

    const filterData = async () => {
        let filtered = [...vendasData];

        if (filtroDataInicial) {
            const [day, month, year] = filtroDataInicial.split('/').map(Number);
            const dataInicial = new Date(year, month - 1, day);
            if (isValidDate(dataInicial)) {
                const isoDataInicial = dataInicial.toISOString().split('T')[0];
                filtered = filtered.filter((venda) => venda.data_venda >= isoDataInicial);
            }
        }

        if (filtroDataFinal) {
            const [day, month, year] = filtroDataFinal.split('/').map(Number);
            const dataFinal = new Date(year, month - 1, day);
            if (isValidDate(dataFinal)) {
                dataFinal.setDate(dataFinal.getDate() + 1);
                const isoDataFinal = dataFinal.toISOString().split('T')[0];
                filtered = filtered.filter((venda) => venda.data_venda < isoDataFinal);
            }
        }

        if (selectedPessoa) {
            filtered = filtered.filter((venda) => venda.pessoa_id === parseInt(selectedPessoa));
        }

        const pessoaNamesMap = {};
        pessoasData.forEach((pessoa) => {
            pessoaNamesMap[pessoa.id_pessoa] = pessoa.pessoa_nome;
        });

        filtered = filtered.map((venda) => ({
            ...venda,
            id_venda: venda.id_venda,
            pessoa_nome: pessoaNamesMap[venda.pessoa_id],
        }));

        setFilteredData(filtered);
    };

    function isValidDate(date) {
        return date instanceof Date && !isNaN(date);
    }

    return (
        <div className="list-container">
            <div className="filter-container">
                <div className="filter-container">
                    <label className="venda-label">Data Venda:</label>
                    <InputMask
                        mask="99/99/9999"
                        placeholder="DD/MM/YYYY"
                        className="data-input"
                        value={filtroDataInicial}
                        onChange={(e) => setFiltroDataInicial(e.target.value)}
                    />

                <span style={{ margin: '0 5px' }}>à</span>
                    <InputMask
                        mask="99/99/9999"
                        placeholder="DD/MM/YYYY"
                        className="data-input"
                        value={filtroDataFinal}
                        onChange={(e) => setFiltroDataFinal(e.target.value)}
                    />
                </div>

                <div className="dropdown">
                    <label className="dropdown-label">Pessoa:</label>
                    <select className="dropdown-input"
                        value={selectedPessoa}
                        onChange={(e) => setSelectedPessoa(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {pessoasData.map((pessoa) => (
                            <option key={pessoa.id_pessoa} value={pessoa.id_pessoa}>
                                {pessoa.pessoa_nome}
                            </option>
                        ))}
                    </select>
                </div>

                <span style={{ margin: '0 5px' }}></span>
                <div className="dropdown">
                    <label className="dropdown-label">Produto:</label>
                    <select className="dropdown-input"
                        value={selectedProduto}
                        onChange={(e) => setSelectedProduto(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {produtosData.map((produto) => (
                            <option key={produto.id_produto} value={produto.id_produto}>
                                {produto.nome_produto}
                            </option>
                        ))}
                    </select>
                </div>
                <Button onClick={filterData}>
                    <FaSearch /> Filtrar
                </Button>
            </div>

            {filteredData.length > 0 ? (
                <div className="table-container">
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Pessoa Nome</th>
                            <th>Valor Venda</th>
                            <th>Data Venda</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((venda) => (
                            <tr key={venda.id_venda}>
                                <td>{venda.id_venda}</td>
                                <td>{venda.pessoa_nome}</td>
                                <td>{venda.valor_venda}</td>
                                <td>{format(addDays(new Date(venda.data_venda), 1), 'dd/MM/yyyy')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <p>Nada encontrado.</p>
            )}
        </div>
    );
};

export default FiltroVendas;
