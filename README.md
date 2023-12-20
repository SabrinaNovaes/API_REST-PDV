# 💳 API_REST PDV (Frente de Caixa)
Projeto desenvolvido pelo grupo PinkPackets. Consiste na criação de uma API desenvolvida para controle de usuarios, categorias, clientes, produtos e pedidos.

## :computer: Linguagens e Ferramentas
![Skills](https://skillicons.dev/icons?i=nodejs,js,express)

## :red_circle: EndPoints
<img src="" width="150px" />

### 👩‍💻 Usuario
- POST /usuario - Cadastrar Usuario
  
    - Exemplo de entrada:
 
      - Senha será criptografada
      - Email é campo único no banco de dados

```shell
    {
      "nome": "Exemplo",
      "email": "exemplo@email.com",
      "senha": "exemplo123"
    }
```

- PUT /usuario - Atualizar Usuario
  
  - Exemplo de entrada:
    
    - Necessario usuario estar logado para atualizar o usuario, verificação de token de usuario
    - Necessario informar pelo todos os campo para atualizar o Usuario
    - Em caso de atualização de senha, a mesma será criptografada
      
```shell
    {
      "nome": "Exemplo2",
      "email": "exemplo2@email.com",
      "senha": "exemplo1234"
    }
```

- GET /usuario - Detalhar Usuario

    - Exemplo de entrada: No body

      - Necessario usuario estar logado para acessar informações do usuario, verificação de token de usuario

### 📂 Categoria
- GET /categoria - Listar Categorias

    - Exemplo de entrada: Sem body
 
### 🔑 Login
- POST /login - Logar usuario Cadastrado

    - Exemplo de entrada:

      - Nessecario preencher todos os campos para logar
      - Usuario logado gera token de verificação
```shell
    {
       "email": "exemplo@email.com",
       "senha": "exemplo123"
    }
```

### 🛍️ Produto
- POST /produto - Cadastrar Produtos

    - Exemplo de entrada:

      - Necessario usuario estar logado para cadastrar produtos, verificação de token de usuario
      - Necessario preencher todos os campos
      - Valores informados em centavos
```shell
    {
       "descricao": "Notebook",
       "quantidade_estoque": 30,
       "valor": 250000,
       "categoria_id": 1,
       "produto_imagem": "link da imagem"
    }
```
- PUT /produto/:id - Atualizar Produto

    - Exemplo de entrada:

      - Necessario usuario estar logado para cadastrar produtos, verificação de token de usuario
      - Necessario Id do produto
      - Necessario preencher todos os campos
      - Valores informados em centavos
```shell
    {
       "descricao": "Notebook marcaX",
       "quantidade_estoque": 30,
       "valor": 250000,
       "categoria_id": 1,
       "produto_imagem": "link da imagem"
    }
```
- GET /produto - Listar Produtos

    - Exemplo de entrada: No body

      - Necessario usuario estar logado para listar produtos, verificação de token de usuario
      - EndPoint com filtro para listar produtos de acordo com a categoria:
          - /produto?categoria_id=1
- GET /produto/:id - Listar Produto por ID
    - Exemplo de entrada: No body

      - Necessario usuario estar logado para listar produtos, verificação de token de usuario
      - Necessario Id do produto
- DELETE /produto/:id - Deletar Produto por ID

    - Exemplo de entrada: No body

      - Necessario usuario estar logado para deletar produto, verificação de token de usuario
      - Necessario Id do produto
        
### 👩 Cliente
- POST /cliente - Cadastrar Clientes

    - Exemplo de entrada:

      - Necessario usuario estar logado para cadastrar cliente, verificação de token de usuario
      - Necessario informar os campos "nome", "email", "cpf"
      - Necessario que campos "email" e "cpf" sejam unicos
```shell
    {
       "nome": "Exemplo Cliente",
       "email": "exemplocliente@email.com",
       "cpf": "12345678910",
       "cep": "00000000",
       "rua": "exemplo",
       "numero": 00,
       "bairro": "exemplo",
       "cidade": "exemplo",
       "estado": "EX"
    }
```
- PUT /cliente/:id - Atualizar cliente

    - Exemplo de entrada:

      - Necessario usuario estar logado para cadastrar cliente, verificação de token de usuario
      - Necessario informar o ID do cliente
      - Necessario informar os campos "nome", "email", "cpf"
      - Necessario que campos "email" e "cpf" sejam unicos
```shell
    {
       "nome": "Exemplo Cliente",
       "email": "exemplocliente@email.com",
       "cpf": "12345678910",
    }
```
- GET /cliente - Listar todos os clientes

    - Exemplo de entrada: No body

      - Necessario usuario estar logado para listar todos os clientes, verificação de token de usuario
- GET /cliente/:id - Detalhar cliente

    - Exemplo de entrada: No body

      - Necessario usuario estar logado para detalhar cliente, verificação de token de usuario
      - Necessario informar o ID do cliente
        
### 🛒 Pedido
- POST /pedido - Cadastrar Pedidos

    - Exemplo de entrada:

      - Necessario usuario logado para cadastrar pedido, verificação de token de usuario
      - Necessario preencher todos os campos
      - Envio de email de notificação para o cliente confirmando que o pedido foi efetuado com sucesso.

```shell
    {
       "cliente_id": 1,
       "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
       "pedido_produtos": [
            {
                "produto_id": 1,
                "quantidade_produto": 10
            }
    }
```
- GET / pedido - Listar Pedidos

    - Exemplo de entrada: No body

      - Necessario usuario logadi para listar pedidos, verificação de token de usuario
      - EndPoint com filtro para listar pedidos de acordo com o Id do cliente:
          - /pedido?cliente_id=1

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

  git clone <git@github.com:SabrinaNovaes/API_REST-PDV.git> - SSH
  git clone <https://github.com/SabrinaNovaes/API_REST-PDV.git> - HTTPS

# 2. Instale as dependências

  npm i

# 3. Execute o backend

  npm run dev

```

## 📚 Bicliotecas 

```shell
- Express                - PG                          - Aws-Sdk
- Nodemon                - Jsonwebtoken                - Bcrypt
- Joi                    - Nodemailer                  - Multer
- Cors                   - Knex                        - Dotenv
```

### :writing_hand: Autoras

- Sabrina Novaes <github: https://github.com/SabrinaNovaes>
- Udimile Macedo <github: https://github.com/udimile>
- Eliana Fuji <github: https://github.com/ElianaFuji>
- Natalia Ribeiro <github: https://github.com/nah-rj>
- Estefane <github: https://github.com/estr3la>
