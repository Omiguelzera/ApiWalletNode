## Documentação do Projeto: Sistema de Gestão de Usuários e Transações
# Sumário
1. Visão Geral
1. Instalação
2. Configuração
3. Estrutura do Projeto
4. Rotas da API
5. Schemas de Validação
6. Autenticação
7. Exemplos de Uso
# Visão Geral
Este projeto é um sistema de gestão de usuários e transações financeiras, construído utilizando Node.js, Express, MongoDB e Mongoose. Ele oferece funcionalidades de cadastro, login, e gerenciamento de transações associadas a usuários.

# Instalação

Para instalar e configurar o projeto, siga os passos abaixo:

1. Clone o repositório:

git clone https://github.com/usuario/projeto.git

2. Navegue até o diretório do projeto:

cd projeto

3. Instale as dependências:

npm install

4. Crie um arquivo .env na raiz do projeto com as seguintes variáveis: 

DATABASE_URI=mongodb://localhost:27017/seu-database
SECRET=sua-chave-secreta

# Configuração

Para conectar ao banco de dados MongoDB, o projeto utiliza a função conectaBanco que se encontra em database.js:

import mongoose from "mongoose";
import "dotenv/config";

export async function conectaBanco() {
    const url = process.env.DATABASE_URI;

    try {
        await mongoose.connect(url);
        console.log("Banco penetrado!");
    } catch (err) {
        console.log(err.message);
    }
}

export default async function disconectaBanco() {
    await mongoose.disconnect();
}


# Estrutura do Projeto



projeto/

│

├── controller/

│   ├── transacoesControle.js

│   ├── usuarioControle.js

│

├── middleware/

│   ├── autenticacaoMiddleware.js

│   ├── validacaoMiddleware.js

│

├── repository/

│   ├── transacoesRepository.js

│   ├── usuarioRepository.js

│

├── schema/

│   ├── Usuario.js

│   ├── transacoes.js

│   ├── validation/

│       ├── validaTransacoes.js

│       ├── validacaoLog.js

│       ├── validacaoUsuario.js

│

├── service/

│   ├── transacoesService.js

│   ├── usuarioService.js

│

├── routes/

│   ├── transacoesRoute.js

│   ├── usuarioRoute.js

│

├── database.js

├── app.js

├── .env

├── package.json


# Rotas Api 

Cadastrar Usuário

    Método: POST
    URL: /cadastrar
    Body:

    {
    "nome": "João",
    "sobrenome": "Silva",
    "email": "joao@exemplo.com",
    "cpf": "123.456.789-00",
    "telefone": "1234567890",
    "senha": "senha123",
    "confirmSenha": "senha123"
    }

Login

    Método: POST
    URL: /login
    Body:

    {
    "email": "joao@exemplo.com",
    "senha": "senha123"
    }

Obter Usuário Logado

    Método: GET
    URL: /usuarioLogged
    Headers:

    {
    "Authorization": "Bearer token_jwt"
    }

Criar Transação
    Método: POST
    URL: /
    Body:

    {
    "valor": 100.50,
    "descricao": "Compra",
    "tipo": "input"
    }

Obter Transações por Usuário

    Método: GET
    URL: /
    Headers:
    {
    "Authorization": "Bearer token_jwt"
    }

Atualizar Transação

    Método: PUT
    URL: /:id
    Body:

    {
    "valor": 150.00,
    "descricao": "Compra Atualizada",
    "tipo": "input"
    }

Deletar Transação

    Método: DELETE
    URL: /:id
    Headers:

    {
    "Authorization": "Bearer token_jwt"
    }

## Schemas de Validação

Validação de Usuário

    import Joi from "joi";

    export const validacaoUsuario = Joi.object({
        nome: Joi.string().trim().required().messages({
            'string.base': `"nome" deve ser do tipo 'texto'`,
            'string.empty': `"nome" não pode ser vazio`,
            'any.required': `"nome" é um campo obrigatório`
        }),
        sobrenome: Joi.string().trim().required().messages({
            'string.base': `"sobrenome" deve ser do tipo 'texto'`,
            'string.empty': `"sobrenome" não pode ser vazio`,
            'any.required': `"sobrenome" é um campo obrigatório`
        }),
        email: Joi.string().email().lowercase().required().messages({
            'string.email': `"email" deve ser um e-mail válido`,
            'string.empty': `"email" não pode ser vazio`,
            'any.required': `"email" é um campo obrigatório`
        }),
        cpf: Joi.string().trim().required().messages({
            'string.base': `"cpf" deve ser do tipo 'texto'`,
            'string.empty': `"cpf" não pode ser vazio`,
            'any.required': `"cpf" é um campo obrigatório`
        }),
        telefone: Joi.string().trim().required().messages({
            'string.base': `"telefone" deve ser do tipo 'texto'`,
            'string.empty': `"telefone" não pode ser vazio`,
            'any.required': `"telefone" é um campo obrigatório`
        }),
        senha: Joi.string().required().messages({
            'string.empty': `"senha" não pode ser vazio`,
            'any.required': `"senha" é um campo obrigatório`
        }),
        confirmSenha: Joi.string().required().valid(Joi.ref('senha')).messages({
            'any.only': 'A confirmação de senha deve corresponder à senha',
            'any.required': 'A confirmação de senha é obrigatória'
        })
    });

Validação de Transações

    import Joi from 'joi';

    export const validaTransacoes = Joi.object({
        valor: Joi.number().required().messages({
            'number.base': 'O campo valor deve ser um número.',
            'any.required': 'O campo valor é obrigatório.'
        }),
        descricao: Joi.string().required().messages({
            'string.base': 'O campo descricao deve ser uma string.',
            'any.required': 'O campo descricao é obrigatório.'
        }),
        tipo: Joi.string().required().valid("input", "output").messages({
            'string.base': 'O campo tipo deve ser uma string.',
            'any.required': 'O campo tipo é obrigatório.'
        }),
        usuarioId: Joi.object(),
        createdAt: Joi.date()
    });

Validação de Login

    import Joi from "joi";

    export const validacaoLog = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'O email deve ser um email válido',
        'any.required': 'O email é obrigatório'
    }),
    senha: Joi.string().min(8).required().messages({
        'string.min': 'A senha deve ter no mínimo 8 caracteres',
        'any.required': 'A senha é obrigatória'
    })
});

## Autenticação

A autenticação é feita usando JWT (JSON Web Token). O middleware autenticacaoMiddleware verifica o token enviado no cabeçalho da requisição

## Exemplos de Uso

Para usar a API, é necessário fazer requisições HTTP para as rotas especificadas. Aqui estão alguns exemplos usando `curl`

1. Cadastrar Usuário:

    curl -X POST http://localhost:3000/cadastrar -H "Content-Type: application/json" -d '{"nome":"João", "sobrenome":"Silva", "email":"joao@exemplo.com", "cpf":"123.456.789-00", "telefone":"1234567890", "senha":"senha123", "confirmSenha":"senha123"}'

2. Login:

    curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email":"joao@exemplo.com", "senha":"senha123"}'

3. Obter Usuário Logado:

    curl -X GET http://localhost:3000/usuarioLogged -H "Authorization: Bearer token_jwt"

4. Criar Transação:

    curl -X POST http://localhost:3000/transacoes -H "Authorization: Bearer token_jwt" -H "Content-Type: application/json" -d '{"valor":100.50, "descricao":"Compra", "tipo":"input"}'

5. Obter Transações por Usuário:

    curl -X GET http://localhost:3000/transacoes -H "Authorization: Bearer token_jwt"

6. Atualizar Transação:

    curl -X PUT http://localhost:3000/transacoes/id_da_transacao -H "Authorization: Bearer token_jwt" -H "Content-Type: application/json" -d '{"valor":150.00, "descricao":"Compra Atualizada", "tipo":"input"}'

7. Deletar Transação:

    curl -X DELETE http://localhost:3000/transacoes/id_da_transacao -H "Authorization: Bearer token_jwt"

## Visão completa descritiva do projeto : 

Visão Geral
O projeto é um sistema de gestão de usuários e transações financeiras. Ele foi desenvolvido utilizando Node.js, Express e MongoDB, com Mongoose para a modelagem de dados. As principais funcionalidades incluem o cadastro e autenticação de usuários, bem como a criação, leitura, atualização e exclusão (CRUD) de transações financeiras associadas a esses usuários.

Funcionalidades Principais
Cadastro de Usuários: Permite que novos usuários se registrem no sistema fornecendo informações pessoais como nome, sobrenome, email, CPF, telefone e senha.

Autenticação de Usuários: Utiliza JWT (JSON Web Token) para autenticar os usuários. Isso inclui a validação de credenciais de login e a emissão de tokens para acesso seguro às rotas protegidas da API.

Gerenciamento de Transações:

Criação de Transações: Usuários autenticados podem criar novas transações financeiras, especificando valor, descrição e tipo (entrada ou saída).
Listagem de Transações: Usuários podem visualizar todas as suas transações financeiras.
Atualização de Transações: Permite que usuários atualizem detalhes de transações existentes.
Exclusão de Transações: Usuários podem deletar transações específicas.
Estrutura do Projeto
O projeto é organizado em várias camadas para separar responsabilidades e facilitar a manutenção:

Controller: Contém a lógica de controle que processa as requisições e envia respostas apropriadas. Exemplos incluem transacoesControle.js e usuarioControle.js.

Middleware: Inclui funções intermediárias para processamento de requisições, como autenticação (autenticacaoMiddleware.js) e validação de dados (validacaoMiddleware.js).

Repository: Responsável pela interação direta com o banco de dados. Inclui métodos para operações CRUD nos modelos de dados, como transacoesRepository.js e usuarioRepository.js.

Schema: Define os modelos de dados utilizando Mongoose, e inclui esquemas de validação com Joi. Exemplos incluem Usuario.js, transacoes.js e esquemas de validação em validation/.

Service: Contém a lógica de negócios e regras de aplicação, separando a lógica do controlador. Exemplos incluem transacoesService.js e usuarioService.js.

Routes: Define as rotas da API e associa cada rota a um controlador específico. Exemplos incluem transacoesRoute.js e usuarioRoute.js.

Autenticação
A autenticação é implementada utilizando JWT. Os tokens são gerados durante o login e são necessários para acessar rotas protegidas. O middleware de autenticação verifica a validade dos tokens antes de permitir o acesso a essas rotas.

Validação de Dados
A validação dos dados de entrada é realizada utilizando o Joi. Existem esquemas de validação para usuários (cadastro e login) e transações, garantindo que apenas dados válidos sejam processados pelo sistema.

Banco de Dados
O projeto utiliza MongoDB como banco de dados, com Mongoose para a modelagem de dados. A conexão com o banco é gerenciada em database.js, onde são definidos métodos para conectar e desconectar do banco de dados.

Configuração
As configurações do projeto, incluindo a URI do banco de dados e a chave secreta para o JWT, são armazenadas em um arquivo .env. Este arquivo deve ser configurado corretamente para que o sistema funcione.

Conclusão
Este projeto oferece uma estrutura sólida para a gestão de usuários e transações financeiras, utilizando práticas modernas de desenvolvimento com Node.js, Express e MongoDB. Ele é escalável e pode ser expandido com novas funcionalidades conforme necessário.
