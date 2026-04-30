# 🚀 Nexo On

## 📌 Descrição do Projeto

O **Nexo On** é uma aplicação web voltada para a gestão de demandas internas de uma organização. O sistema permite o controle de usuários, autenticação com diferentes níveis de acesso e gerenciamento de tarefas (demandas), proporcionando uma administração centralizada e eficiente.

---

## 🎯 Objetivo

O projeto tem como objetivo aplicar conceitos de desenvolvimento web e práticas de DevOps, incluindo:

* Versionamento de código
* Conteinerização com Docker
* Orquestração com Docker Compose
* Automação de pipeline
* Análise de qualidade de software

---

## 🛠️ Tecnologias Utilizadas

### Front-end

* React
* Vite
* CSS

### Back-end

* Python
* FastAPI
* SQLAlchemy
* JWT (autenticação)

### Banco de Dados

* SQLite (atual)
* PostgreSQL (planejado para Docker)

### DevOps (em implementação)

* Docker
* Docker Compose
* Jenkins
* SonarQube

---

## 📂 Estrutura do Projeto

```
nexo-on/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── test.db
│
├── frontend/
│   └── nexo-on-frontend/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── login/
│       │   │   └── dashboard/
│       │   └── services/
│       └── package.json
│
└── README.md
```

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

* Login com JWT
* Controle de acesso por perfil (admin, gestor, colaborador)

### 👤 Usuários

* Criar usuário
* Listar usuários (admin)
* Editar usuário (admin)
* Alterar perfil (admin)
* Deletar usuário (admin)

### 📋 Demandas

* Criar demanda
* Listar demandas
* Atualizar demanda
* Deletar demanda

### 🖥️ Interface

* Tela de login
* Dashboard
* Navegação protegida

---

## ▶️ Como Executar o Projeto

### 🔧 Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Acesse:

```
http://127.0.0.1:8000/docs
```

---

### 💻 Frontend

```bash
cd frontend/nexo-on-frontend
npm install
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

## 🔑 Usuário de Teste

```json
{
  "email": "administrador@email.com",
  "senha": "22122023"
}
```

---

## 🌿 GitFlow (Estratégia de Branches)

* `main` → versão estável
* `develop` → integração de features
* `feature/*` → novas funcionalidades
* `hotfix/*` → correções rápidas

---

## 🐳 Conteinerização (Em desenvolvimento)

O projeto será executado com:

* Docker
* Docker Compose

Serviços planejados:

* frontend
* backend
* banco de dados (PostgreSQL)

---

## 🔄 Pipeline CI/CD (Em desenvolvimento)

* Jenkins para automação
* Build e testes automatizados
* Integração com análise de código

---

## 📊 Qualidade de Código

* SonarQube (planejado)
* Validação de qualidade (Quality Gate)

---

## 👥 Integrantes

* Hanielly Marques

---

## 📌 Status do Projeto

🚧 Em desenvolvimento

---

## 💡 Observações

Este projeto foi desenvolvido como atividade acadêmica com foco em práticas de DevOps e desenvolvimento full stack.

---
