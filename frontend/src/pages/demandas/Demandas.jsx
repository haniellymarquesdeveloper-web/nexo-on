import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Demandas.css";

const API_URL = "http://localhost:8000";

export default function Demandas() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    prioridade: "media",
    responsaveis_ids: [],
    data_inicio: "",
    prazo_conclusao: "",
  });

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch {
      setUsuarios([]);
    }
  }

  function alternarResponsavel(id) {
    setForm((prev) => {
      const jaExiste = prev.responsaveis_ids.includes(id);

      return {
        ...prev,
        responsaveis_ids: jaExiste
          ? prev.responsaveis_ids.filter((item) => item !== id)
          : [...prev.responsaveis_ids, id],
      };
    });
  }

  async function criarDemanda(e) {
    e.preventDefault();
    setMensagem("");

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao,
      prioridade: form.prioridade,
      responsaveis_ids: form.responsaveis_ids,
      data_inicio: form.data_inicio || null,
      prazo_conclusao: form.prazo_conclusao || null,
    };

    try {
      const response = await fetch(`${API_URL}/demandas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagem(data.detail || "Erro ao criar demanda.");
        return;
      }

      setMensagem("Demanda criada com sucesso!");

      setForm({
        titulo: "",
        descricao: "",
        prioridade: "media",
        responsaveis_ids: [],
        data_inicio: "",
        prazo_conclusao: "",
      });

    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  }

  return (
    <div className="demandas-page">
      <aside className="sidebar">
        <div>
          <h2>Nexo On</h2>

          <nav>
            <button onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            <button className="active">
              Criar Demandas
            </button>

            <button onClick={() => navigate("/usuarios")}>
              Usuários
            </button>
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="demandas-content">
        <section className="demandas-header">
          <div>
            <h1>Criar Demandas</h1>
            <p>
              Cadastre uma nova demanda e atribua aos usuários responsáveis.
            </p>
          </div>
        </section>

        {mensagem && (
          <p className="mensagem-form">
            {mensagem}
          </p>
        )}

        <section className="form-card">
          <h2>Nova demanda</h2>

          <form onSubmit={criarDemanda} className="form-demanda">

            <div className="form-grid">

              <div className="form-group">
                <label>Título da demanda</label>

                <input
                  type="text"
                  placeholder="Digite o título da demanda"
                  value={form.titulo}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      titulo: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Prioridade</label>

                <select
                  value={form.prioridade}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      prioridade: e.target.value,
                    })
                  }
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div className="form-group">
                <label>Data de início</label>

                <input
                  type="date"
                  value={form.data_inicio}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      data_inicio: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Prazo de conclusão</label>

                <input
                  type="date"
                  value={form.prazo_conclusao}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      prazo_conclusao: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <div className="form-group">
              <label>Descrição da demanda</label>

              <textarea
                placeholder="Descreva a demanda com mais detalhes..."
                value={form.descricao}
                onChange={(e) =>
                  setForm({
                    ...form,
                    descricao: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Usuários atribuídos</label>

              <div className="responsaveis-lista">

                {usuarios.length === 0 ? (
                  <p>Nenhum usuário encontrado.</p>
                ) : (
                  usuarios.map((usuario) => (
                    <label
                      key={usuario.id}
                      className="responsavel-item"
                    >
                      <input
                        type="checkbox"
                        checked={form.responsaveis_ids.includes(usuario.id)}
                        onChange={() =>
                          alternarResponsavel(usuario.id)
                        }
                      />

                      {usuario.nome} — {usuario.email}
                    </label>
                  ))
                )}

              </div>
            </div>

            <button type="submit" className="btn-primary">
              Criar demanda
            </button>

          </form>
        </section>
      </main>
    </div>
  );
}