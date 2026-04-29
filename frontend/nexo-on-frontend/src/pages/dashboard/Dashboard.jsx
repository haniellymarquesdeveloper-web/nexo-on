import "./Dashboard.css";

export default function Dashboard() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>Nexo On</h2>

        <nav>
          <button>Dashboard</button>
          <button>Demandas</button>
          <button>Usuários</button>
        </nav>

        <button className="logout" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="dashboard-content">
        <h1>Dashboard</h1>
        <p>Bem-vinda ao sistema Nexo On.</p>

        <div className="cards">
          <div className="card">
            <h3>Demandas</h3>
            <p>Gerencie tarefas e solicitações internas.</p>
          </div>

          <div className="card">
            <h3>Usuários</h3>
            <p>Controle usuários e permissões.</p>
          </div>

          <div className="card">
            <h3>Status</h3>
            <p>Sistema conectado com sucesso.</p>
          </div>
        </div>
      </main>
    </div>
  );
}