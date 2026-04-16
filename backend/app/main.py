from fastapi import FastAPI
from app.routes.user import router as user_router
from app.routes.auth import router as auth_router
from app.database import engine, Base
from app.models import user as user_model
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexo On API")

app = FastAPI(title="Nexo On API")

origins = [
    "http://localhost:5173",  
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

@app.get("/")
def home():
    return {"message": "Nexo On rodando!"}