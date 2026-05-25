🚀 Nexo On

📌 Sobre o Projeto

O Nexo On é uma aplicação web full stack desenvolvida para auxiliar no gerenciamento de demandas internas de uma organização. O sistema permite o controle de usuários, autenticação com diferentes níveis de acesso e gerenciamento de tarefas, proporcionando uma administração centralizada, organizada e eficiente.

A aplicação foi construída com foco em práticas modernas de desenvolvimento web e DevOps, integrando frontend, backend e banco de dados em uma arquitetura conteinerizada com Docker.

🔗 Repositório oficial:
Nexo On - GitHub

🎯 Objetivo

O principal objetivo do projeto é aplicar, de forma prática, conceitos relacionados ao desenvolvimento full stack e à cultura DevOps, incluindo:

versionamento de código;
organização de branches;
conteinerização com Docker;
orquestração de serviços com Docker Compose;
desenvolvimento de API REST;
autenticação segura com JWT;
integração entre frontend, backend e banco de dados;
automação de pipeline com GitHub Actions;
análise de qualidade de software com SonarCloud.
🛠️ Tecnologias Utilizadas
🎨 Front-end
React
Vite
CSS3
JavaScript
⚙️ Back-end
Python
FastAPI
SQLAlchemy
JWT Authentication
Uvicorn
🗄️ Banco de Dados
PostgreSQL
🐳 DevOps
Docker
Docker Compose
GitHub Actions
SonarCloud
Git/GitHub
📂 Estrutura do Projeto
nexo-on/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── sonar-project.properties
└── README.md
⚙️ Funcionalidades
🔐 Sistema de Autenticação
Login utilizando JWT;
Controle de acesso por perfil;
Rotas protegidas;
Persistência de autenticação.
👤 Gerenciamento de Usuários
Criar usuários;
Listar usuários;
Editar usuários;
Alterar perfil de acesso;
Excluir usuários;
Controle administrativo.

📋 Gerenciamento de Demandas

Criar demandas;
Listar demandas;
Atualizar demandas;
Excluir demandas;
Definir prioridade;
Atribuir responsáveis;
Controle de status das tarefas.

📊 Dashboard

Visualização de métricas;
Quantidade de demandas;
Demandas pendentes;
Demandas concluídas;
Interface centralizada de gerenciamento.

🐳 Conteinerização da Aplicação

A aplicação utiliza Docker para execução isolada dos serviços e Docker Compose para orquestração completa do ambiente.

Serviços configurados:
Frontend;
Backend;
Banco de dados PostgreSQL.
▶️ Como Executar o Projeto
📌 Pré-requisitos

Antes de começar, instale:

Docker Desktop
Git
📥 1. Clonar o Repositório
git clone https://github.com/haniellymarquesdeveloper-web/nexo-on.git

cd nexo-on
🚀 2. Executar o Projeto

Na raiz do projeto, execute:

docker compose up --build
🌐 3. Acessar os Serviços
Serviço	URL
Frontend	http://localhost:3000
Backend	http://localhost:8000
Swagger/OpenAPI	http://localhost:8000/docs
👤 4. Criar um Usuário

Acesse a documentação da API:

http://localhost:8000/docs

Utilize o endpoint de criação de usuários para cadastrar um novo usuário no sistema.

🔑 5. Tornar Usuário Administrador

Acesse o terminal do banco:

docker compose exec db psql -U user -d nexo

Execute o comando SQL:

UPDATE usuarios
SET perfil = 'admin'
WHERE email = 'administrador@gmail.com';

Sair do terminal:

\q

🔐 6. Realizar Login

Após configurar o usuário administrador, será possível:

acessar o sistema;
visualizar o dashboard;
gerenciar usuários;
gerenciar demandas;
utilizar funcionalidades administrativas.
🌿 Estratégia de Branches

O projeto utiliza uma organização baseada em GitFlow simplificado:

Branch	Finalidade
main	versão estável
develop	integração de funcionalidades
feature/*	desenvolvimento de novas funcionalidades
🔄 Pipeline e Qualidade de Código

O projeto possui integração contínua utilizando:

✅ GitHub Actions

Responsável pela automação de verificações e integração contínua do projeto.

✅ SonarCloud

Responsável pela análise da qualidade do código, identificação de vulnerabilidades, bugs e problemas de manutenção.

📌 Requisitos Atendidos

✅ Front-end integrado;
✅ Back-end integrado;
✅ Banco de dados configurado;
✅ Docker Compose;
✅ Containers Docker;
✅ Versionamento no GitHub;
✅ Organização de branches;
✅ CRUD completo;
✅ Pipeline com GitHub Actions;
✅ Integração com SonarCloud.

👥 Integrantes
Hanielly Silva Marques
Bruno Daniel de Andrade Pereira

📚 Considerações Finais

O Nexo On foi desenvolvido como projeto acadêmico com foco na aplicação prática de conceitos de desenvolvimento full stack e DevOps.

Além do desenvolvimento da aplicação funcional, o projeto buscou aplicar boas práticas relacionadas à organização de código, conteinerização, integração contínua, qualidade de software e versionamento colaborativo.
