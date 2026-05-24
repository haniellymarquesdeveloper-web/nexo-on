from enum import Enum
from datetime import date
from pydantic import BaseModel

class StatusDemandaEnum(str, Enum):
    pendente = "pendente"
    em_andamento = "em_andamento"
    concluida = "concluida"

class PrioridadeDemandaEnum(str, Enum):
    baixa = "baixa"
    media = "media"
    alta = "alta"

class DemandaCreate(BaseModel):
    titulo: str
    descricao: str
    prioridade: PrioridadeDemandaEnum = PrioridadeDemandaEnum.media
    responsaveis_ids: list[int] = []
    data_inicio: date | None = None
    prazo_conclusao: date | None = None

class DemandaUpdate(BaseModel):
    titulo: str | None = None
    descricao: str | None = None
    status: StatusDemandaEnum | None = None
    prioridade: PrioridadeDemandaEnum | None = None
    responsaveis_ids: list[int] | None = None
    data_inicio: date | None = None
    prazo_conclusao: date | None = None

class UsuarioResumo(BaseModel):
    id: int
    nome: str
    email: str
    perfil: str

    class Config:
        from_attributes = True

class DemandaResponse(BaseModel):
    id: int
    titulo: str
    descricao: str
    status: StatusDemandaEnum
    prioridade: PrioridadeDemandaEnum
    criador_id: int
    data_inicio: date | None = None
    prazo_conclusao: date | None = None
    responsaveis: list[UsuarioResumo] = []

    class Config:
        from_attributes = True