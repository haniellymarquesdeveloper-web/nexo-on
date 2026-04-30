import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div>
          <h2>Nexo On</h2>

          <nav>
            <button className="active">Dashboard</button>
            <button onClick={() => navigate("/demandas")}>Demandas</button>
            <button>Usuários</button>
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="dashboard-content">
        <div className="top-bar">
          <div>
            <h1>Dashboard</h1>
            <p>Visão geral do sistema Nexo On</p>
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h2>12</h2>
            <span>Total de demandas</span>
          </div>

          <div className="stat-card">
            <h2>5</h2>
            <span>Pendentes</span>
          </div>

          <div className="stat-card">
            <h2>4</h2>
            <span>Em andamento</span>
          </div>

          <div className="stat-card">
            <h2>3</h2>
            <span>Concluídas</span>
          </div>
        </div>

        <div className="cards">
          <div className="card" onClick={() => navigate("/demandas")}>
            <h3>Demandas</h3>
            <p>Gerencie tarefas e acompanhe o progresso.</p>
          </div>

          <div className="card">
            <h3>Usuários</h3>
            <p>Gerencie acessos e permissões.</p>
          </div>

          <div className="card">
            <h3>Status</h3>
            <p>Sistema funcionando normalmente.</p>
          </div>
        </div>
      </main>
    </div>
  );
}