from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse, UserPerfilUpdate, UserUpdate
from app.routes.auth import get_current_admin
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

    print("SENHA RECEBIDA:", user.senha)
    print("TAMANHO DA SENHA:", len(user.senha))

    novo_usuario = User(
        nome=user.nome,
        email=user.email,
        senha=gerar_hash_senha(user.senha),
        perfil="colaborador"
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario


@router.patch("/usuarios/{usuario_id}/perfil", response_model=UserResponse)
def atualizar_perfil(
    usuario_id: int,
    dados: UserPerfilUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    usuario = db.query(User).filter(User.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    usuario.perfil = dados.perfil

    db.commit()
    db.refresh(usuario)

    return usuario

@router.get("/usuarios", response_model=list[UserResponse])
def listar_usuarios(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    return db.query(User).all()

@router.put("/usuarios/{usuario_id}", response_model=UserResponse)
def atualizar_usuario(
    usuario_id: int,
    dados: UserUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    usuario = db.query(User).filter(User.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    usuario.nome = dados.nome
    usuario.email = dados.email

    db.commit()
    db.refresh(usuario)

    return usuario

@router.delete("/usuarios/{usuario_id}")
def deletar_usuario(
    usuario_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    usuario = db.query(User).filter(User.id == usuario_id).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    db.delete(usuario)
    db.commit()

    return {"mensagem": "Usuário deletado com sucesso."}