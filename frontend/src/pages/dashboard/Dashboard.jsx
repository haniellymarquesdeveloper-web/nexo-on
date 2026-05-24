import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_URL = "http://localhost:8000";

export default function Dashboard() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [demandas, setDemandas] = useState([]);
  const [erro, setErro] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    buscarUsuario();
    buscarDemandas();
  }, []);

  async function buscarUsuario() {
    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.detail || "Erro ao buscar usuário logado.");
        setUsuario(null);
        return;
      }

      setUsuario(data);
    } catch {
      setErro("Erro ao buscar usuário logado.");
      setUsuario(null);
    }
  }

  async function buscarDemandas() {
    try {
      const response = await fetch(`${API_URL}/demandas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.detail || "Erro ao buscar demandas.");
        setDemandas([]);
        return;
      }

      setDemandas(Array.isArray(data) ? data : []);
      setErro("");
    } catch {
      setErro("Erro ao buscar demandas.");
      setDemandas([]);
    }
  }

  async function concluirDemanda(id) {
    const response = await fetch(`${API_URL}/demandas/${id}/concluir`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setErro("Erro ao concluir demanda.");
      return;
    }

    buscarDemandas();
  }

  async function excluirDemanda(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta demanda?"
    );

    if (!confirmar) return;

    const response = await fetch(`${API_URL}/demandas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setErro("Erro ao excluir demanda.");
      return;
    }

    buscarDemandas();
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario");

    window.location.href = "/";
  }

  const perfil = usuario?.perfil?.toLowerCase();

  const podeGerenciar =
    perfil === "admin" ||
    perfil === "administrador" ||
    perfil === "gestor";

  const podeExcluir =
    perfil === "admin" ||
    perfil === "administrador";

  const totalDemandas = demandas.length;

  const pendentes = demandas.filter(
    (d) => d.status === "pendente"
  ).length;

  const emAndamento = demandas.filter(
    (d) => d.status === "em_andamento"
  ).length;

  const concluidas = demandas.filter(
    (d) => d.status === "concluida"
  ).length;

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div>
          <h2>Nexo On</h2>

          <nav>
            <button className="active">
              Dashboard
            </button>

            <button onClick={() => navigate("/demandas")}>
              Criar Demandas
            </button>

            {podeGerenciar && (
              <button onClick={() => navigate("/usuarios")}>
                Usuários
              </button>
            )}
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="dashboard-content">
        <section className="top-bar">
          <div>
            <h1>Dashboard</h1>

            <p>
              Bem-vinda, {usuario?.nome || "usuário"} —
              perfil:{" "}
              <strong>
                {usuario?.perfil || "não identificado"}
              </strong>
            </p>
          </div>
        </section>

        {erro && <p className="erro">{erro}</p>}

        <section className="stats">
          <div className="stat-card">
            <h2>{totalDemandas}</h2>
            <span>Total de demandas</span>
          </div>

          <div className="stat-card">
            <h2>{pendentes}</h2>
            <span>Pendentes</span>
          </div>

          <div className="stat-card">
            <h2>{emAndamento}</h2>
            <span>Em andamento</span>
          </div>

          <div className="stat-card">
            <h2>{concluidas}</h2>
            <span>Concluídas</span>
          </div>
        </section>

        <section className="demandas-section">
          <div className="section-header">
            <h2>Demandas cadastradas</h2>

            {podeGerenciar && (
              <button onClick={() => navigate("/demandas")}>
                Nova demanda
              </button>
            )}
          </div>

          <div className="table-wrapper">
            <table className="demandas-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Responsáveis</th>
                  <th>Prazo</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {demandas.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      Nenhuma demanda encontrada.
                    </td>
                  </tr>
                ) : (
                  demandas.map((demanda) => (
                    <tr key={demanda.id}>
                      <td>{demanda.titulo}</td>

                      <td>{demanda.prioridade}</td>

                      <td>
                        <span
                          className={`status ${demanda.status}`}
                        >
                          {demanda.status}
                        </span>
                      </td>

                      <td>
                        {demanda.responsaveis?.length > 0
                          ? demanda.responsaveis
                              .map((u) => u.nome)
                              .join(", ")
                          : "Sem responsável"}
                      </td>

                      <td>
                        {demanda.prazo_conclusao ||
                          "Sem prazo"}
                      </td>

                      <td className="acoes">
                        {podeGerenciar &&
                          demanda.status !== "concluida" && (
                            <button
                              onClick={() =>
                                concluirDemanda(demanda.id)
                              }
                            >
                              Concluir
                            </button>
                          )}

                        {podeGerenciar && (
                          <button
                            onClick={() =>
                              navigate("/demandas")
                            }
                          >
                            Editar
                          </button>
                        )}

                        {podeExcluir && (
                          <button
                            className="danger"
                            onClick={() =>
                              excluirDemanda(demanda.id)
                            }
                          >
                            Excluir
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}