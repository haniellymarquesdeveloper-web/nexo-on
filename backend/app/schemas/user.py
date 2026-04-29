from enum import Enum
from pydantic import BaseModel, EmailStr


class PerfilEnum(str, Enum):
    admin = "admin"
    gestor = "gestor"
    colaborador = "colaborador"


class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    


class UserResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    perfil: PerfilEnum

    class Config:
        from_attributes = True


class UserPerfilUpdate(BaseModel):
    perfil: PerfilEnum


class UserUpdate(BaseModel):
    nome: str
    email: EmailStr    