# API de Usuários

Esta é uma API para gerenciar usuários utilizando o Firebase Firestore. Os endpoints permitem criar e buscar usuários. A API está desenvolvida com o Firebase Functions e utiliza o Firestore como banco de dados.

## Índice

- [Endpoints](#endpoints)
  - [Criar Usuário](#criar-usuário)
  - [Buscar Usuário](#buscar-usuário)
- [Configuração](#configuração)
- [Execução Local](#execução-local)
- [Testes](#testes)

## Endpoints

### 1. Criar Usuário

- **Método**: `POST`
- **URL**: `/createUser`
- **Descrição**: Cria um novo usuário com o nome fornecido e retorna uma confirmação com o ID do novo documento.
- **Parâmetros do body (json)**:
  - `name` (string, obrigatório): Nome do usuário a ser criado.
- **Resposta**:
  - **Código de Sucesso**: `201 Created`
    ```json
    {
      "message": "User successfully created!"
    }
    ```
  - **Código de Erro**: `500 Internal Server Error` em caso de falha ao criar o usuário.

**Exemplo de Requisição**:

```bash
curl -X POST http://localhost:5001/YOUR_PROJECT_ID/us-central1/createUser \
-H "Content-Type: application/json" \
-d '{"name": "John Doe"}'
```

### 1. Buscar Usuário

- **Método**: `GET`
- **URL**: `/getUser`
- **Descrição**: Retorna um usuário com o increment_id fornecido.
- **Parâmetros de query**:
  - `id` (integer, obrigatório): increment_id do usuario.
- **Resposta**:
  - **Código de Sucesso**: `201 Created`
    ```json
    {
      "message": "User successfully found!",
      "data": {
        "name": "John Doe",
        "increment_id": 1
      }
    }
    ```
  - **Código de Erro**: `404 Not Found` em caso de não existir um usuario com o increment id.

**Exemplo de Requisição**:

```bash
curl -X GET http://localhost:5001/YOUR_PROJECT_ID/us-central1/getUser/1
```

## Configuração

Para configurar o ambiente de desenvolvimento:

1. Instale as Dependências:

```bash
  npm install
```

## Execução Local

Para executar a API localmente usando emuladores do Firebase:

1. Inicie os Emuladores do Firebase:

  ```bash
    firebase emulators:start
  ```
2. Acesse a API:

A API estará disponível em http://localhost:5001/YOUR_PROJECT_ID/us-central1/.

## Testes automatizados

Para rodar os testes unitários:

```bash 
    npm test
```

Os testes estão localizados no diretório functions/test e utilizam jest para garantir que a API funciona conforme esperado.

