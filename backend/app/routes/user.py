from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.database import SessionLocal
from app.models.user import User
from app.services.security import gerar_hash_senha

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/usuarios", response_model=UserResponse)
def criar_usuario(user: UserCreate, db: Session = Depends(get_db)):
    usuario_existente = db.query(User).filter(User.email == user.email).first()

    if usuario_existente:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")
    
    novo_usuario = User(
        nome=user.nome,
        email=user.email,
        senha=gerar_hash_senha(user.senha),
        perfil=user.perfil
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario