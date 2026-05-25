🚀 Nexo On

📌 Sobre o Projeto

O Nexo On é uma aplicação web full stack desenvolvida para auxiliar no gerenciamento de demandas internas de uma organização. O sistema permite controle de usuários, autenticação com diferentes níveis de acesso e gerenciamento de tarefas, proporcionando uma administração centralizada, organizada e eficiente.

O projeto foi desenvolvido com foco na aplicação prática de conceitos de desenvolvimento web e DevOps, integrando frontend, backend e banco de dados em uma arquitetura conteinerizada com Docker.

🔗 Repositório Oficial:
https://github.com/haniellymarquesdeveloper-web/nexo-on.git

🎯 Objetivo

O principal objetivo do projeto é aplicar conceitos relacionados a:

Desenvolvimento Full Stack;
Versionamento de código;
Organização de branches;
Conteinerização com Docker;
Orquestração de serviços com Docker Compose;
Desenvolvimento de API REST;
Autenticação com JWT;
Integração entre frontend, backend e banco de dados;
Pipeline com GitHub Actions;
Análise de qualidade com SonarCloud.
--------------------------------------------------------------------------------------------------------------------------------------
🛠️ Tecnologias Utilizadas

🎨 Front-end
React
Vite
JavaScript
CSS3

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

------------------------------------------------------------------------------------------------------------------------------------------

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

-----------------------------------------------------------------------------------------------------------------------------------------
⚙️ Funcionalidades

🔐 Autenticação
Login com JWT;
Controle de acesso por perfil;
Rotas protegidas;
Persistência de autenticação.  
------------------------------------------------------------------------------------------------------------------------------------------
👤 Gerenciamento de Usuários

Criar usuários;
Listar usuários;
Editar usuários;
Alterar perfil;
Excluir usuários;
Controle administrativo.
------------------------------------------------------------------------------------------------------------------------------------------
📋 Gerenciamento de Demandas

Criar demandas;
Listar demandas;
Atualizar demandas;
Excluir demandas;
Definir prioridade;
Atribuir responsáveis;
Controle de status.
------------------------------------------------------------------------------------------------------------------------------------------
📊 Dashboard

Visualização de métricas;
Demandas pendentes;
Demandas concluídas;
Informações centralizadas da aplicação.
------------------------------------------------------------------------------------------------------------------------------------------
🐳 Conteinerização

A aplicação utiliza Docker para execução isolada dos serviços e Docker Compose para orquestração completa do ambiente.

Serviços configurados:
Frontend;
Backend;
PostgreSQL.
-----------------------------------------------------------------------------------------------------------------------------------------
▶️ Como Executar o Projeto

📌 Pré-requisitos

Antes de começar, instale:

Docker Desktop
Git
------------------------------------------------------------------------------------------------------------------------------------------
📥 1. Clonar o Repositório

git clone https://github.com/haniellymarquesdeveloper-web/nexo-on.git

cd nexo-on

🚀 2. Executar o Projeto

Na raiz do projeto: docker compose up --build

🌐 3. Acessar os Serviços

Frontend: http://localhost:3000
Backend: http://localhost:8000
Swagger: http://localhost:8000/docs

------------------------------------------------------------------------------------------------------------------------------------------
👤 4. Criar Usuário

Acesse: http://localhost:8000/docs

------------------------------------------------------------------------------------------------------------------------------------------
🔑 5. Tornar Usuário Administrador

Abra o terminal do banco: docker compose exec db psql -U user -d nexo

E execute: 

UPDATE usuarios
SET perfil = 'admin'
WHERE email = 'administrador@gmail.com';

Para sair do banco: \q

------------------------------------------------------------------------------------------------------------------------------------------
🔐 6. Realizar Login

Após configurar o usuário administrador, será possível:

acessar o dashboard;
gerenciar usuários;
gerenciar demandas;
utilizar funcionalidades administrativas.

------------------------------------------------------------------------------------------------------------------------------------------
🌿 Estratégia de Branches

O projeto utiliza uma organização baseada em GitFlow simplificado:

main: versão estável
develop: integração de funcionalidades
feature/*: novas funcionalidades
------------------------------------------------------------------------------------------------------------------------------------------
🔄 Pipeline e Qualidade de Código

✅ GitHub Actions: Responsável pela automação da pipeline e validações do projeto.
✅ SonarCloud: Responsável pela análise de qualidade, vulnerabilidades e identificação de bugs.

------------------------------------------------------------------------------------------------------------------------------------------
📌 Requisitos Atendidos:

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

------------------------------------------------------------------------------------------------------------------------------------------
👥 Integrantes

-> Hanielly Silva Marques
-> Bruno Daniel de Andrade Pereira

------------------------------------------------------------------------------------------------------------------------------------------

📚 Considerações Finais

O Nexo On foi desenvolvido como projeto acadêmico com foco na aplicação prática de conceitos de desenvolvimento full stack e DevOps.

O sistema busca demonstrar a integração entre frontend, backend, banco de dados, conteinerização, versionamento, automação e qualidade de software em uma aplicação funcional e organizada.























