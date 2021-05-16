# gRPC Challange

Projeto que segue uma estrutura de como criar microsserviços utilizando protobuffers e consumo através de um client WebAPI.
O objetivo do projeto consiste em autenticar registrar, listar e autenticar novos usuários, e que cada usuário consiga salvar compras e lista-las. Cada compra (_purchase_) está vinculada a um id de usuário que é persistido em uma base de dados do mongodb.

# Estrutura do projeto

A estrutura de pastas seguida aqui é bem comum em algumas aplicações em camadas, porém existe um sentido para cada projeto, como

- **calypso** é um microsserviço em node que tem a função de service para registar, autenticar e gerar tokens de usuário e validar os tokens.
- **kraken** é um microsserviço em node que tem a função de criar as compras por usuário e realizar buscas.
- **WebApi** é um projeto em express que trabalha como o nosso _client_. Este realiza a comunicação com os micrisserviços.

### Pastas

    calypso/src
    ├── config
    ├── database
    ├── models
    └── protos

    kraken/src
    ├── config
    ├── database
    ├── models
    └── protos

    WebApi
    ├── config
    ├── controllers
    ├── infra
    │   └── providers
    │   └── protos
    ├── middlewares
    └── routes

| Pasta       | Tipo                                                  |
| ----------- | :---------------------------------------------------- |
| database    | Configurações de banco de dados .                     |
| models      | Modelos do mongoose.                                  |
| protos      | Arquivos de .proto com estrutura das mensagens.       |
| controllers | Controllers para lógica de requisições.               |
| infra       | Conteúdo de load e contratos para protobuffers.       |
| middlewares | Interceptadores de requisição.                        |
| routes      | Registro de rotas da aplicação.                       |
| configs     | Arquivos de configuração.                             |
| Providers   | Implementações para comunificação com microsserviços. |

# Requisitos do projeto

- mongodb na porta 27017 `sem senha`.

## Fontes

- [gRPC Doc](https://grpc.io/docs/what-is-grpc/introduction/)
- [Node Example](https://grpc.io/docs/languages/node/quickstart/)
- [Microsserviços com gRPC | Code Challenge](https://www.youtube.com/watch?v=FcZ00E5PLIE)
