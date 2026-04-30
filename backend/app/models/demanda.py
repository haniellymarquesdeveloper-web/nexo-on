from sqlalchemy import Column, Integer, String, ForeignKey, Date
from app.database import Base


class Demanda(Base):
    __tablename__ = "demandas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    status = Column(String, default="pendente", nullable=False)
    prioridade = Column(String, default="media", nullable=False)

    criador_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    responsavel_id = Column(Integer, ForeignKey("usuarios.id"), nullable=True)

    data_inicio = Column(Date, nullable=True)
    prazo_conclusao = Column(Date, nullable=True)   