CREATE DATABASE pdv;

CREATE TABLE
    usuarios (
        id serial primary key,
        nome text,
        email text unique not null,
        senha text not null,
    );

CREATE TABLE
    categorias (
        id serial primary key,
        descricao text
    );

INSERT INTO
    categorias (descricao)
VALUES ('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');

CREATE TABLE
    produtos (
        id serial primary key,
        descricao text,
        quantidade_estoque integer,
        valor integer,
        categoria_id integer references categorias(id)
    );

CREATE TABLE
    clientes (
        id serial primary key,
        nome text,
        email text unique not null,
        cpf text unique not null,
        cep text,
        rua text,
        numero integer,
        bairro text,
        cidade text,
        estado text
    );

CREATE TABLE
    pedidos (
        id serial primary key,
        cliente_id integer references clientes(id),
        observacao text,
        valor_total int,
    );

CREATE TABLE
    pedido_produtos (
        id serial primary key,
        pedido_id integer references pedidos(id),
        produto_id integer references produtos(id),
        quantidade_produto integer,
        valor_produto integer,
    );

ALTER TABLE produtos ADD produto_imagem TEXT;