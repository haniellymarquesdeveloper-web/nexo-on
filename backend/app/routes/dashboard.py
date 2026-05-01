from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.demanda import Demanda

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/dashboard")
def resumo_dashboard(db: Session = Depends(get_db)):
    total = db.query(Demanda).count()

    pendentes = db.query(Demanda).filter(Demanda.status == "pendente").count()

    em_andamento = db.query(Demanda).filter(Demanda.status == "em_andamento").count()

    concluidas = db.query(Demanda).filter(Demanda.status == "concluida").count()

    return {
        "total_demandas": total,
        "pendentes": pendentes,
        "em_andamento": em_andamento,
        "concluidas": concluidas
    }