import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Usuarios.css";

const API_URL = "http://localhost:8000";

export default function Usuarios() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [usuarioEditado, setUsuarioEditado] = useState({
    nome: "",
    email: "",
    perfil: "colaborador",
  });

  useEffect(() => {
    buscarUsuarioLogado();
    carregarUsuarios();
  }, []);

  async function buscarUsuarioLogado() {
    const response = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (response.ok) {
      setUsuarioLogado(data);
      localStorage.setItem("usuario", JSON.stringify(data));
    }
  }

  async function carregarUsuarios() {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch {
      alert("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function cadastrarUsuario(e) {
    e.preventDefault();

    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.detail || "Erro ao cadastrar usuário.");
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    setNovoUsuario({ nome: "", email: "", senha: "" });
    setMostrarFormulario(false);
    carregarUsuarios();
  }

  function iniciarEdicao(usuario) {
    setEditandoId(usuario.id);
    setUsuarioEditado({
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil,
    });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setUsuarioEditado({
      nome: "",
      email: "",
      perfil: "colaborador",
    });
  }

  async function salvarEdicao(id) {
    const responseUsuario = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome: usuarioEditado.nome,
        email: usuarioEditado.email,
      }),
    });

    if (!responseUsuario.ok) {
      alert("Erro ao atualizar usuário.");
      return;
    }

    const responsePerfil = await fetch(`${API_URL}/usuarios/${id}/perfil`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        perfil: usuarioEditado.perfil,
      }),
    });

    if (!responsePerfil.ok) {
      alert("Erro ao atualizar perfil.");
      return;
    }

    alert("Usuário atualizado com sucesso!");
    cancelarEdicao();
    carregarUsuarios();
  }

  async function excluirUsuario(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return;

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      alert("Erro ao excluir usuário.");
      return;
    }

    alert("Usuário excluído com sucesso!");
    carregarUsuarios();
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  }

  const isAdmin = usuarioLogado?.perfil === "admin";

  return (
    <div className="usuarios-page">
      <aside className="sidebar">
        <div>
          <h2>Nexo On</h2>

          <nav>
            <button onClick={() => navigate("/dashboard")}>Dashboard</button>
            <button onClick={() => navigate("/demandas")}>Criar Demandas</button>
            <button className="active">Usuários</button>
          </nav>
        </div>

        <button className="logout" onClick={logout}>Sair</button>
      </aside>

      <main className="usuarios-content">
        <div className="usuarios-header">
          <div>
            <h1>Usuários cadastrados</h1>
            <p>Visualize e gerencie os usuários registrados no Nexo On.</p>
          </div>

          {isAdmin && (
            <button
              className="btn-novo-usuario"
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
              {mostrarFormulario ? "Fechar" : "Novo usuário"}
            </button>
          )}
        </div>

        {mostrarFormulario && isAdmin && (
          <div className="usuarios-form-card">
            <h2>Cadastrar usuário</h2>

            <form onSubmit={cadastrarUsuario} className="usuarios-form">
              <input
                type="text"
                placeholder="Nome"
                value={novoUsuario.nome}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, nome: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="E-mail"
                value={novoUsuario.email}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Senha"
                value={novoUsuario.senha}
                onChange={(e) =>
                  setNovoUsuario({ ...novoUsuario, senha: e.target.value })
                }
                required
              />

              <button type="submit">Cadastrar usuário</button>
            </form>
          </div>
        )}

        <div className="usuarios-card">
          <h2>Lista de usuários</h2>

          {loading ? (
            <p>Carregando usuários...</p>
          ) : usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <div className="usuarios-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    {isAdmin && <th>Ações</th>}
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>

                      <td>
                        {editandoId === usuario.id ? (
                          <input
                            className="input-edicao"
                            value={usuarioEditado.nome}
                            onChange={(e) =>
                              setUsuarioEditado({
                                ...usuarioEditado,
                                nome: e.target.value,
                              })
                            }
                          />
                        ) : (
                          usuario.nome
                        )}
                      </td>

                      <td>
                        {editandoId === usuario.id ? (
                          <input
                            className="input-edicao"
                            value={usuarioEditado.email}
                            onChange={(e) =>
                              setUsuarioEditado({
                                ...usuarioEditado,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          usuario.email
                        )}
                      </td>

                      <td>
                        {editandoId === usuario.id ? (
                          <select
                            className="input-edicao"
                            value={usuarioEditado.perfil}
                            onChange={(e) =>
                              setUsuarioEditado({
                                ...usuarioEditado,
                                perfil: e.target.value,
                              })
                            }
                          >
                            <option value="colaborador">colaborador</option>
                            <option value="gestor">gestor</option>
                            <option value="admin">admin</option>
                          </select>
                        ) : (
                          <span className={`perfil ${usuario.perfil}`}>
                            {usuario.perfil}
                          </span>
                        )}
                      </td>

                      {isAdmin && (
                        <td className="acoes-usuarios">
                          <div className="menu-container">
                            <button
                              className="btn-menu-tres-pontos"
                              onClick={() =>
                                setMenuAberto(menuAberto === usuario.id ? null : usuario.id)
                              }
                              title="Menu de ações"
                            >
                              ⋮
                            </button>

                            {menuAberto === usuario.id && !editandoId && (
                              <div className="menu-dropdown">
                                <button
                                  className="menu-item"
                                  onClick={() => {
                                    iniciarEdicao(usuario);
                                    setMenuAberto(null);
                                  }}
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  className="menu-item danger"
                                  onClick={() => {
                                    excluirUsuario(usuario.id);
                                    setMenuAberto(null);
                                  }}
                                >
                                  🗑️ Excluir
                                </button>
                              </div>
                            )}

                            {editandoId === usuario.id && (
                              <div className="menu-dropdown">
                                <button
                                  className="menu-item"
                                  onClick={() => salvarEdicao(usuario.id)}
                                >
                                  ✓ Salvar
                                </button>
                                <button
                                  className="menu-item"
                                  onClick={cancelarEdicao}
                                >
                                  ✕ Cancelar
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}