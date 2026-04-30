from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.demanda import Demanda
from app.models.user import User
from app.schemas.demanda import DemandaCreate, DemandaUpdate, DemandaResponse
from app.routes.auth import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/demandas", response_model=DemandaResponse)
def criar_demanda(
    demanda: DemandaCreate,
    db: Session = Depends(get_db),
    usuario: User = Depends(get_current_user)
):
    nova_demanda = Demanda(
        titulo=demanda.titulo,
        descricao=demanda.descricao,
        prioridade=demanda.prioridade,
        criador_id=usuario.id,
        responsavel_id=demanda.responsavel_id,
        data_inicio=demanda.data_inicio,
        prazo_conclusao=demanda.prazo_conclusao
    )

    db.add(nova_demanda)
    db.commit()
    db.refresh(nova_demanda)

    return nova_demanda


@router.get("/demandas", response_model=list[DemandaResponse])
def listar_demandas(db: Session = Depends(get_db)):
    return db.query(Demanda).all()


@router.get("/demandas/{demanda_id}", response_model=DemandaResponse)
def buscar_demanda(demanda_id: int, db: Session = Depends(get_db)):
    demanda = db.query(Demanda).filter(Demanda.id == demanda_id).first()

    if not demanda:
        raise HTTPException(status_code=404, detail="Demanda não encontrada.")

    return demanda


@router.put("/demandas/{demanda_id}", response_model=DemandaResponse)
def atualizar_demanda(
    demanda_id: int,
    dados: DemandaUpdate,
    db: Session = Depends(get_db)
):
    demanda = db.query(Demanda).filter(Demanda.id == demanda_id).first()

    if not demanda:
        raise HTTPException(status_code=404, detail="Demanda não encontrada.")

    if dados.titulo is not None:
        demanda.titulo = dados.titulo

    if dados.descricao is not None:
        demanda.descricao = dados.descricao

    if dados.status is not None:
        demanda.status = dados.status

    if dados.prioridade is not None:
        demanda.prioridade = dados.prioridade

    if dados.responsavel_id is not None:
        demanda.responsavel_id = dados.responsavel_id

    if dados.data_inicio is not None:
        demanda.data_inicio = dados.data_inicio

    if dados.prazo_conclusao is not None:
        demanda.prazo_conclusao = dados.prazo_conclusao

    db.commit()
    db.refresh(demanda)

    return demanda


@router.delete("/demandas/{demanda_id}")
def deletar_demanda(demanda_id: int, db: Session = Depends(get_db)):
    demanda = db.query(Demanda).filter(Demanda.id == demanda_id).first()

    if not demanda:
        raise HTTPException(status_code=404, detail="Demanda não encontrada.")

    db.delete(demanda)
    db.commit()

    return {"mensagem": "Demanda deletada com sucesso."}