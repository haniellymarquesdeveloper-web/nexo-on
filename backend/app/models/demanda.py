from sqlalchemy import Column, Integer, String, Date, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base

demanda_usuarios = Table(
    "demanda_usuarios",
    Base.metadata,
    Column("demanda_id", Integer, ForeignKey("demandas.id")),
    Column("usuario_id", Integer, ForeignKey("usuarios.id")),
)

class Demanda(Base):
    __tablename__ = "demandas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String, nullable=False)
    prioridade = Column(String, default="media")
    criador_id = Column(Integer, ForeignKey("usuarios.id"))
    status = Column(String, default="pendente")
    data_inicio = Column(Date)
    prazo_conclusao = Column(Date)

    responsaveis = relationship("User", secondary=demanda_usuarios) 