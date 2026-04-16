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
    perfil: str

class UserResponse(BaseModel):
    nome: str
    email: EmailStr
    perfil: PerfilEnum
 