from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routes import trips

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TransitOps API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # hackathon speed — allows any frontend origin to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(trips.router)


@app.get("/")
def root():
    return {"message": "TransitOps API running"}