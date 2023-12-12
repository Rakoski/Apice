create database apice;

use apice;

create table cidade(
id_cidade BIGINT not null primary key auto_increment,
cidade_nome varchar(100) not null,
sigla_uf varchar(3) not null
);

create table bairro(
id_bairro BIGINT not null primary key auto_increment,
bairro_nome varchar(100) not null
);

create table pessoa(
id_pessoa BIGINT not null primary key auto_increment,
bairro_id BIGINT not null,
cidade_id BIGINT not null,
pessoa_nome varchar(100) not null,
cep varchar(9) not null,
endereco varchar(100) not null,
numero varchar(5) not null,
complemento varchar(100) not null, 
telefone varchar(21) not null,
email varchar(100) not null,
foreign key (bairro_id) references bairro(id_bairro) ON DELETE CASCADE,
foreign key (cidade_id) references cidade(id_cidade) ON DELETE CASCADE
);

create table produto(
id_produto BIGINT Not null primary key auto_increment,
nome_produto varchar(100) not null,
valor_produto DECIMAL(15, 2) not null
);

create table venda(
id_venda BIGINT not null primary key auto_increment,
pessoa_id BIGINT not null,
valor_venda DECIMAL(15, 2) not null,
foreign key (pessoa_id) references pessoa(id_pessoa) ON DELETE CASCADE
);

create table venda_produto(
id_vendaproduto BIGINT not null primary key auto_increment,
venda_id BIGINT not null,
produto_id BIGINT not null,
foreign key (venda_id) references venda(id_venda) ON DELETE CASCADE,
foreign key (produto_id) references produto(id_produto) ON DELETE CASCADE
);

CREATE TABLE usuario(
id_usuario BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
usuario_nome varchar(255) not null,
usuario_sobrenome varchar(255) not null,
usuario_email varchar(100) not null unique,
usuario_senha varchar(255) not null
);




