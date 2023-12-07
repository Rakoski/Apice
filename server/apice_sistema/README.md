# Sistema da Ápice para projeto de estágio!
Repositório backend para o sistema fullstack p/ apice com React, NodeJS, ExpressJS, Sequelize e MySQL

# Backend do Aplicativo do sistema da Ápice - README

Este é o backend do projeto de aplicativo de gerenciamento da Ápice sistemas, desenvolvido em Javascript com NodeJS, ExpressJS e Sequelize. O backend fornece as APIs para o web em React a se conectarem e obterem todos os dados necessários para melhor gerenciamento.

## Tecnologias Utilizadas

- Backend: NodeJS, ExpressJS e Sequelize (javascript)
- Build tool c/ npm, Yarn e configurações com .env (dotenv)
- Banco de Dados: MySQL, 

## Configuração

1. Clone este repositório.
2. Configure as variáveis de ambiente, como informações do banco de dados, no arquivo `package.json`.
3. cd para src/
4. Execute o aplicativo usando o node: node index.js

## Estrutura do Projeto Backend

A estrutura do projeto NodeJS gerenciado pelo npm (Node Package Manager) em combinação com o  "Node.js Package Manager" (nvm) ou o "Yarn" segue a seguinte organização:

- `apice_sistema/src/`: Pacote principal.
- `controllers`: Os controladores são funções que respondem às solicitações HTTP e executam a lógica de negócios.
- `models`: Modelos de dados da aplicação.
- `routes`:  As rotas são usadas para definir como o servidor deve responder a diferentes solicitações HTTP.
- `service`: Camada de serviço que lida com a lógica de negócios.

## API Endpoints

### Produtos

- **GET /produtos**
    - Descrição: Retorna todos os produtos.
    - Uso: `GET /api/produtos`
    - Resposta:
  ```json
  {
    "data": [
        {
            "id_produto": 1,
            "nome_produto": "mouse",
            "valor_produto": "29.99"
        },
        {
            "id_produto": 5,
            "nome_produto": "caneta BIC preta",
            "valor_produto": "2.99"
        },
        {
            "id_produto": 6,
            "nome_produto": "Marca texto Masterprint",
            "valor_produto": "5.99"
        },
        {
            "id_produto": 7,
            "nome_produto": "Caneta azul BIC",
            "valor_produto": "1.99"
        }
    ]
}

- **GET /produtos/:id**
    - Descrição: Retorna um produto específico com base no ID.
    - Uso: `GET /api/produtos/:id`
    - Resposta:
    ```json
  {
    "data": {
        "id_produto": 1,
        "nome_produto": "mouse",
        "valor_produto": "29.99"
      }
  }

- **POST /produtos**
    - Descrição: Cria um novo produto.
    - Uso: `POST /produtos`
    - Corpo da requisição:
  ````json
  {
    "nome_produto": "Mouse",
    "valor_produto": 12.99
  }

- **PUT /produtos/:id**
    - Descrição: Atualiza um produto existente com base no ID.
    - Uso: `PUT /api/produtos/:id`

- **DELETE /produtos/:id**
    - Descrição: Exclui um produto existente com base no ID.
    - Uso: `DELETE /api/produtos/:id`

### Bairros

- **GET /bairros**
    - Descrição: Retorna todos os bairros.
    - Uso: `GET /api/bairros`
    - Resposta de sucesso:
    ```json
    {
        "data": [
            {
                "id_bairro": 1,
                "bairro_nome": "Jardins"
            },
            {
                "id_bairro": 2,
                "bairro_nome": "Leblon"
            }
        ]
    }

- **GET /bairros/:id**
    - Descrição: Retorna um bairro específico com base no ID.
    - Uso: `GET /api/bairros/:id`
    - Reposta de sucesso:
    ```json
    {
        "data": {
            "id_bairro": 2,
            "bairro_nome": "Leblon"
        }
    }

- **POST /bairros**
    - Descrição: Cria um novo bairro.
    - Uso: `POST /api/bairros`
    - Corpo da requisição:
    ```json
    {
        "bairro_nome": "Bom Retiro",
        "id_bairro": 3 (opcional)
    }
    ```
    - Resposta de sucesso:
    ```json
    {
        "message": "Bairro criado com sucesso"
    }

- **GET /bairros/nome/:bairro_nome**
    - Descrição: Pega as informações de um bairro e de todas pessoas nele através de seu nome
    - Uso `GET /api/bairros/nome/:bairro_nome`

- **PUT /bairros/:id**
    - Descrição: Atualiza um bairro existente com base no ID.
    - Uso: `PUT /api/bairros/:id`

- **DELETE /bairros/:id**
    - Descrição: Exclui um bairro existente com base no ID.
    - Uso: `DELETE /api/bairros/:id`

### Cidades

- **GET /cidades**
    - Descrição: Retorna todas as cidades.
    - Uso: `GET /api/cidades`
    - Resposta de sucesso:
    ```json
    {
    "data": [
        {
            "id_cidade": 1,
            "cidade_nome": "São Paulo",
            "sigla_uf": "SP"
        },
        {
            "id_cidade": 2,
            "cidade_nome": "Rio de Janeiro",
            "sigla_uf": "RJ"
        },
        {
            "id_cidade": 12,
            "cidade_nome": "Brasilia",
            "sigla_uf": "DF"
        }
    ] 
  }

- **GET /cidades/:id**
    - Descrição: Retorna uma cidade específica com base no ID.
    - Uso: `GET /api/cidades/:id`
    - Resposta de sucesso:
    ```json
    {
    "data": {
        "id_cidade": 1,
        "cidade_nome": "São Paulo",
        "sigla_uf": "SP"
     }
   }

- **POST /cidades**
    - Descrição: Cria uma nova cidade.
    - Uso: `POST /api/cidades`
    - Corpo da requisição:
    ```json
    {
        "cidade_nome": "Brasilia",
        "sigla_uf": "DF",
        "id_cidade": 15 (opcional)
    }

- **PUT /cidades/:id**
    - Descrição: Atualiza uma cidade existente com base no ID.
    - Uso: `PUT /api/cidades/:id`

- **DELETE /cidades/:id**
    - Descrição: Exclui uma cidade existente com base no ID.
    - Uso: `DELETE /api/cidades/:id`

### Pessoas

- **POST /pessoas**
    - Descrição: Cria uma nova pessoa.
    - Uso: `POST /api/pessoas`
    - Corpo da requisição:
    ```json
    {
        "id_pessoa": 3,
        "pessoa_nome": "Lionel Messi",
        "cep": "12345-678",
        "endereco": "Rua Tancredo Neves 123",
        "numero": "184",
        "complemento": "Apt 26BA",
        "telefone": "+55 (44) 99765-654",
        "email": "leomessi@gmai.com",
        "bairro_id": 1,
        "cidade_id": 1
    }

- **GET /pessoas**
  - Descrição: Retorna todas as cidades já registradas.
  - Uso: `GET /api/pessoas
  - Corpo da requisição:
  ```json
  [
    {
        "id_pessoa": 2,
        "pessoa_nome": "João de Barro",
        "cep": "12345-678",
        "endereco": "123 Rua principal",
        "numero": "1A",
        "complemento": "Apt 2B",
        "telefone": "+55 (44) 91234-5678",
        "email": "joão@exemplo.com",
        "bairro_id": 1,
        "cidade_id": 1
    },
    {
        "id_pessoa": 3,
        "pessoa_nome": "Lionel Messi",
        "cep": "12345-678",
        "endereco": "Rua Tancredo Neves 123",
        "numero": "184",
        "complemento": "Apt 26BA",
        "telefone": "+55 (44) 99765-6543",
        "email": "leomessi@gmai.com",
        "bairro_id": 1,
        "cidade_id": 1
    }
  ]

- **PUT /pessoas/:id**
    - Descrição: Atualiza uma cidade existente com base no ID.
    - Uso: `PUT /api/cidades/:id`

- **DELETE /pessoas/:id**
    - Descrição: Exclui uma cidade existente com base no ID.
    - Uso: `DELETE /api/cidades/:id`

### Vendas

- **POST /vendas**
- Descrição: Cria uma nova venda.
- Uso: `POST /api/vendas`
- Corpo da requisição:
    ```json
    {
      "pessoa_id": 7,
      "valor_venda": 50.99, 
      "data_venda": "2023-10-07" 
    }

- **GET /vendas**
- Descrição: Pega todas as vendas.
- Uso: `GET api/vendas`
- Resposta de sucesso:
    ```json
    {
        "data": [
            {
                "id_venda": 1,
                "pessoa_id": 3,
                "valor_venda": "100.00"
            }
        ]
    }

- **GET /vendas/:valor_venda/:data_venda**
- Descrição: pega o id_venda através do valor_venda e da data_venda
- Uso: `GET /api/vendas/:valor_venda/:data_venda
- Resposta de sucesso:
  ```json
  {
    "data": 2
  }

- **PUT /vendas/:id**
    - Descrição: Atualiza uma venda existente com base no ID.
    - Uso: `PUT /api/vendas/:id`

- **DELETE /vendas/:id**
    - Descrição: Exclui uma venda existente com base no ID.
    - Uso: `DELETE /api/vendas/:id`

### Venda_Produto

- **POST /vendas_produtos**
- Descrição: Registra uma venda com seu produto
- Uso: `POST /api/vendas_produtos`
- Corpo da requisição:
  ```json
  {
    "venda_id": 1,
    "produtos": [1, 5, 6]
  }
- Resposta de sucesso:
  ```json
  {
    "message": "venda_produto criado com sucesso"
  }

- **GET /vendas_produtos**
- Descrição: Pega todas as vendas registradas com seus produtos
- Uso: `GET /api/vendas_produtos`
- Resposta de sucesso:
  ```json
  {
    "data": [
        {
            "id_vendaproduto": 1,
            "produto_id": 1,
            "venda_id": 1
        },
        {
            "id_vendaproduto": 2,
            "produto_id": 1,
            "venda_id": 1
        },
        {
            "id_vendaproduto": 3,
            "produto_id": 5,
            "venda_id": 1
        }
    ]
  }

- **GET vendas_produtos/produto/:id_produto**
- Descrição: Pega todas as vendas registradas com um único produto
- Uso `GET /api/vendas_produtos/produto/:id_produto**
- Resposta de sucesso:
  ```json
  {
    "data": [
        {
            "id_vendaproduto": 1,
            "produto_id": 3,
            "venda_id": 112
        },
        {
            "id_vendaproduto": 8,
            "produto_id": 3,
            "venda_id": 1990
        },
        {
            "id_vendaproduto": 11,
            "produto_id": 3,
            "venda_id": 45
        }
    ]
  }

- **PUT /vendas_produtos/:id**
    - Descrição: Atualiza uma venda_produto existente com base no ID.
    - Uso: `PUT /api/venda_produtos/:id`

- **DELETE /vendas_produtos/:id**
    - Descrição: Exclui uma venda_produto existente com base no ID.
    - Uso: `DELETE /api/venda_produtos/:id`

## Contribuição

Se você deseja contribuir para este projeto, sinta-se à vontade para enviar pull requests ou relatar problemas na seção de issues.
