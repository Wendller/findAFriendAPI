# Find A Friend API 🐕

Uma aplicação para encontrar animais disponíveis para adoção na sua cidade

## Regras da aplicação 📃

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

## Regras de negócio 📃

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Construído com 🛠

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Documentação da API

#### Visualizar todos os pets de uma cidade com filtros 🐶🐶🐶

```http
  GET /pets?city= - application/json
```

| Parâmetro - Query    | Tipo     | Descrição                                   |
| :------------------- | :------- | :------------------------------------------ |
| `city`               | `string` | **Obrigatório**: Cidade do pet              |
| `age`                | `string` | **Opcional**: Idade do pet                  |
| `size`               | `string` | **Opcional**: Tamanho do pet                |
| `energyLevel`        | `string` | **Opcional**: Nível de energia do pet       |
| `indenpendencyLevel` | `string` | **Opcional**: Nível de independência do pet |

#### Visualizar detalhes um pet 🐶

```http
  GET /pets/${petId} - application/json
```

| Parâmetro - Route | Tipo                 | Descrição                    |
| :---------------- | :------------------- | :--------------------------- |
| `petId`           | `route param string` | **Obrigatório**. O ID do pet |

#### Registrar-se como organização 🏠

```http
  POST /orgs - application/json
```

| Parâmetro - Body | Tipo     | Descrição                                |
| :--------------- | :------- | :--------------------------------------- |
| `name`           | `string` | **Obrigatório**. Nome da organização     |
| `email`          | `string` | **Obrigatório**. Email da organização    |
| `password`       | `string` | **Obrigatório**. Senha de login          |
| `postalCode`     | `string` | **Obrigatório**. CEP da organização      |
| `address`        | `string` | **Obrigatório**. Endereço da organização |
| `whatsapp`       | `string` | **Obrigatório**. WhatsApp da organização |

#### Fazer login como organização 🔐

```http
  POST /orgs/sessions - application/json
```

| Parâmetro - Body | Tipo     | Descrição                             |
| :--------------- | :------- | :------------------------------------ |
| `email`          | `string` | **Obrigatório**. Email da organização |
| `password`       | `string` | **Obrigatório**. Senha de login       |

#### Cadastrar um animal para adoção 🐕‍🦺

```http
  POST /pets (Autenticado como organização) - Multipart/form-data
```

| Parâmetro - Body     | Tipo     | Descrição                                       |
| :------------------- | :------- | :---------------------------------------------- |
| `name`               | `string` | **Obrigatório**. Nome do animal                 |
| `description`        | `string` | **Obrigatório**: Informações sobre o pet        |
| `age`                | `string` | **Obrigatório**: Idade do pet                   |
| `size`               | `string` | **Obrigatório**: Tamanho do pet                 |
| `energyLevel`        | `string` | **Obrigatório**: Nível de energia do pet        |
| `indenpendencyLevel` | `string` | **Obrigatório**: Nível de independência do pet  |
| `environmentType`    | `string` | **Obrigatório**: Ambiente apropriado para o pet |
| `orgId`              | `string` | **Obrigatório**: ID da organização responsável  |

| Parâmetro - Body | Tipo   | Descrição                          |
| :--------------- | :----- | :--------------------------------- |
| `images`         | `file` | **Obrigatório**. Imagens do animal |

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`NODE_ENV`

`JWT_SECRET`

`APP_URL`

`DATABASE_URL`

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Wendller/findAFriendAPI.git
```

Entre no diretório do projeto

```bash
  cd findAFriendAPI
```

Instale as dependências

```bash
  npm install
```

Inicie o container do banco

```bash
  docker compose up -d
```

Inicie o servidor

```bash
  npm run start:dev
```

## Rodando os testes

Para rodar os testes unitários

```bash
  npm run test
```

Para rodar os testes e2e

```bash
  npm run test:e2e
```
