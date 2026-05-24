import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../services/api";
import "./Usuarios.css";

function Usuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await api.get("/usuarios");

      setUsuarios(response.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        alert("Você não tem permissão para acessar usuários.");
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario");

    window.location.href = "/";
  }

  return (
    <div className="usuarios-container">
      <aside className="sidebar">
        <h1>Nexo On</h1>

        <nav>
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button onClick={() => navigate("/demandas")}>
            Criar Demandas
          </button>

          {(usuarioLogado?.perfil === "admin" ||
            usuarioLogado?.perfil === "gestor") && (
            <button className="active">
              Usuários
            </button>
          )}
        </nav>

        <button className="logout-btn" onClick={logout}>
          Sair
        </button>
      </aside>

      <main className="usuarios-content">
        <div className="usuarios-header">
          <h1>Usuários cadastrados</h1>

          <p>
            Gerencie os usuários do sistema.
          </p>
        </div>

        <div className="usuarios-card">
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
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>

                      <td>
                        <span
                          className={`perfil ${usuario.perfil}`}
                        >
                          {usuario.perfil}
                        </span>
                      </td>
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

export default Usuarios;