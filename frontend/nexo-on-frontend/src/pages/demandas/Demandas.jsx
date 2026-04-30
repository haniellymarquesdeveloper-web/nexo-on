import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import "./Demandas.css";

export default function Demandas() {
  const [demandas, setDemandas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("media");
  const [responsavelId, setResponsavelId] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [prazoConclusao, setPrazoConclusao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token");

  async function carregarDemandas() {
    try {
      const response = await fetch(`${API_URL}/demandas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setDemandas(Array.isArray(data) ? data : []);
    } catch {
      setMensagem("Erro ao carregar demandas.");
    }
  }

  async function carregarUsuarios() {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch {
      setMensagem("Erro ao carregar usuários.");
    }
  }

  async function criarDemanda(e) {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await fetch(`${API_URL}/demandas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          descricao,
          prioridade,
          responsavel_id: responsavelId ? Number(responsavelId) : null,
          data_inicio: dataInicio || null,
          prazo_conclusao: prazoConclusao || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Erro ao criar demanda.");
      }

      setTitulo("");
      setDescricao("");
      setPrioridade("media");
      setResponsavelId("");
      setDataInicio("");
      setPrazoConclusao("");
      setMensagem("Demanda criada com sucesso!");
      carregarDemandas();
    } catch (error) {
      setMensagem(error.message);
    }
  }

  function buscarNomeResponsavel(id) {
    const usuario = usuarios.find((user) => user.id === id);
    return usuario ? usuario.nome : "Não atribuído";
  }

  function formatarStatus(status) {
    if (status === "em_andamento") return "Em andamento";
    if (status === "concluida") return "Concluída";
    return "Pendente";
  }

  function formatarPrioridade(prioridade) {
    if (prioridade === "alta") return "Alta";
    if (prioridade === "baixa") return "Baixa";
    return "Média";
  }

  function classeStatus(status) {
    if (status === "em_andamento") return "andamento";
    if (status === "concluida") return "concluida";
    return "pendente";
  }

  useEffect(() => {
    carregarDemandas();
    carregarUsuarios();
  }, []);

  return (
    <div className="demandas-page">
      <div className="top-bar">
        <div>
          <h1>Demandas</h1>
          <p>Gerencie as demandas internas do Nexo On.</p>
        </div>

        <button className="btn-nova">+ Nova demanda</button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>{demandas.length}</h2>
          <span>Total de demandas</span>
        </div>

        <div className="stat-card">
          <h2>{demandas.filter((d) => d.status === "pendente").length}</h2>
          <span>Pendentes</span>
        </div>

        <div className="stat-card">
          <h2>{demandas.filter((d) => d.status === "em_andamento").length}</h2>
          <span>Em andamento</span>
        </div>

        <div className="stat-card">
          <h2>{demandas.filter((d) => d.status === "concluida").length}</h2>
          <span>Concluídas</span>
        </div>
      </div>

      <form className="demanda-form" onSubmit={criarDemanda}>
        <h2>Criar nova demanda</h2>

        <div className="form-grid">
          <div className="campo">
            <label>Título da demanda</label>
            <input
              type="text"
              placeholder="Digite o título da demanda"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Prioridade</label>
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="campo">
            <label>Responsável</label>
            <select
              value={responsavelId}
              onChange={(e) => setResponsavelId(e.target.value)}
            >
              <option value="">Selecione um responsável</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome} - {usuario.perfil}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Data de início</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>

          <div className="campo descricao-campo">
            <label>Descrição da demanda</label>
            <textarea
              placeholder="Descreva a demanda com mais detalhes..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Prazo de conclusão</label>
            <input
              type="date"
              value={prazoConclusao}
              onChange={(e) => setPrazoConclusao(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn-criar">
          Criar demanda
        </button>
      </form>

      {mensagem && <p className="mensagem-demanda">{mensagem}</p>}

      <div className="lista-header">
        <h2>Demandas cadastradas</h2>
      </div>

      <div className="demandas-lista">
        {demandas.map((demanda) => (
          <div className="demanda-card" key={demanda.id}>
            <span className={`badge ${classeStatus(demanda.status)}`}>
              {formatarStatus(demanda.status)}
            </span>

            <h3>{demanda.titulo}</h3>
            <p>{demanda.descricao}</p>

            <div className="demanda-info">
              <span>Prioridade: {formatarPrioridade(demanda.prioridade)}</span>
              <span>Responsável: {buscarNomeResponsavel(demanda.responsavel_id)}</span>
              <span>Início: {demanda.data_inicio || "Não informado"}</span>
              <span>Prazo: {demanda.prazo_conclusao || "Não informado"}</span>
            </div>

            <button className="btn-detalhes">Ver detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
}