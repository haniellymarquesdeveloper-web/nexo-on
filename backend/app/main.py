from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.models import user as user_model
from app.models import demanda as demanda_model
from app.routes.user import router as user_router
from app.routes.auth import router as auth_router
from app.routes.demanda import router as demanda_router
from app.routes.dashboard import router as dashboard_router



Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexo On API")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(demanda_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {"message": "Nexo On rodando!"}