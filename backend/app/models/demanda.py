from sqlalchemy import Column, Integer, String, Date
from app.database import Base

class Demanda(Base):
    __tablename__ = "demandas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    descricao = Column(String)
    prioridade = Column(String)
    responsavel_id = Column(Integer)
    criador_id = Column(Integer)
    status = Column(String, default="pendente")
    data_inicio = Column(Date)
    prazo_conclusao = Column(Date)