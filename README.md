# API de Usuários

Esta é uma API para gerenciar usuários utilizando o Firebase Firestore. Os endpoints permitem criar e buscar usuários. A API está desenvolvida com o Firebase Functions e utiliza o Firestore como banco de dados.

## Índice

- [Arquitetura](#arquitetura)
- [Endpoints](#endpoints)
  - [Criar Usuário](#criar-usuário)
  - [Buscar Usuário](#buscar-usuário)
- [Configuração](#configuração)
- [Execução Local](#execução-local)
- [Testes](#testes)
- [Considerações](#considerações)

## Arquitetura

Para o desenvolvimento desse projeto, utilizei alguns conceitos de 2 arquiteturas, visto que a ideia era um projeto que fosse escalavel.

  1. Microserviços

    Cada Modulo de usuario pode ser considerada um microserviço que realiza uma função específica, 
    como criar um usuário ou buscar um usuário. Isso promove a modularidade e facilita a manutenção e o escalonamento do sistema.

    por mais que estejam todas "separadas" no index.js, caso fossemos aumentar o sistema, poderiamos agrupar essas funções por modulo e 
    cada modulo seria um microserviço com funções independentes.

  2. Arquitetura em Camadas (MVC)
   
    Camada de Controle (Controller), Camada de Serviço (Service) e Camada de Persistência (Model)

    A escolha desse tipo de arquitetura, foi para conseguirmos definir bem as responsavbilidades e deixar o projeto mais modular.
    Facilitando na manutenção

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


## Considerações

1. Visto que foi sugerido a não utilização de frameworks, nao utilizei o express. Em um projeto de larga escala e em produção,
   é fortemente recomendado a utilização do mesmo.
  
  alguns pontos de porque utilizar express:

```bash
  1. Modularidade: Melhor suporte para organização de código em módulos e rotas.
  2. Escalabilidade: Facilita a escalabilidade e manutenção à medida que o projeto cresce.
  3. Reutilização de Código: Permite a reutilização de middleware e outros componentes, o que pode reduzir a duplicação de código.
  4. Flexibilidade: Maior flexibilidade para implementar lógica de roteamento complexa.
```

2. Não apliquei o conceito de injeção de dependencia por ser um projeto de curta duração e apenas para identificar como codifico e como trato a arquitetura.
   Porem, como ponto de melhoria, caso fosse um projeto que fosse ser escalado e continuado, modificaria para implementarmos as injeções de dependencia.