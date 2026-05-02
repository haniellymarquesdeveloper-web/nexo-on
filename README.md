# 🚀 Nexo On

## 📌 Descrição do Projeto

O **Nexo On** é uma aplicação web full stack voltada para a gestão de demandas internas de uma organização.  
O sistema permite o controle de usuários, autenticação com diferentes níveis de acesso e gerenciamento de tarefas (demandas), proporcionando uma administração centralizada e eficiente.

---

## 🎯 Objetivo

O projeto tem como objetivo aplicar conceitos de desenvolvimento web e práticas de DevOps, incluindo:

- Versionamento de código
- Conteinerização com Docker
- Orquestração com Docker Compose
- Desenvolvimento de API REST
- Autenticação com JWT
- Integração entre frontend, backend e banco de dados

---

## 🛠️ Tecnologias Utilizadas

### Front-end

- React
- Vite
- CSS

### Back-end

- Python
- FastAPI
- SQLAlchemy
- JWT (autenticação)

### Banco de Dados

- PostgreSQL (via Docker)

### DevOps

- Docker
- Docker Compose

---

## 📂 Estrutura do Projeto



---

## ⚙️ Funcionalidades

### 🔐 Autenticação

- Login com JWT
- Controle de acesso por perfil (admin e colaborador)

### 👤 Usuários

- Criar usuário
- Listar usuários (admin)
- Editar usuário (admin)
- Alterar perfil (admin)
- Deletar usuário (admin)

### 📋 Demandas

- Criar demanda
- Listar demandas
- Atualizar demanda
- Deletar demanda

### 🖥️ Interface

- Tela de login
- Dashboard (em evolução)
- Página de demandas integrada com backend
- Navegação protegida

---

## ▶️ Como Executar o Projeto

### 🐳 1. Pré-requisitos

Antes de começar, instale:

- Docker Desktop  
- Git  

---

### 📥 2. Clonar o repositório

```bash
git clone https://github.com/haniellymarquesdeveloper-web/nexo-on.git
cd nexo-on

🚀 3. Rodar o projeto com Docker

Na raiz do projeto:

docker compose up --build

🌐 4. Acessar o sistema
Frontend → http://localhost:3000
Backend → http://localhost:8000
Docs da API → http://localhost:8000/docs


👤 5. Criar usuário

Acesse o Swagger:

http://localhost:8000/docs

6. Tornar usuário administrador

No terminal, execute:

docker compose exec db psql -U user -d nexo



Depois, no banco:

UPDATE usuarios SET perfil = 'admin' WHERE email = 'admin@gmail.com';

Sair:

\q

🔐 7. Fazer login

Agora você pode:

Fazer login no sistema
Acessar todas as funcionalidades (como admin)

🌿 GitFlow (Estratégia de Branches)
main → versão estável
feature/* → novas funcionalidades
🐳 Conteinerização

O projeto utiliza Docker Compose com os seguintes serviços:

frontend
backend
banco de dados (PostgreSQL)
📊 Status do Projeto

🚧 Em desenvolvimento ativo

👥 Integrantes
Hanielly Marques
Bruno Daniel

💡 Observações

Este projeto foi desenvolvido como atividade acadêmica com foco em práticas de DevOps e desenvolvimento full stack.