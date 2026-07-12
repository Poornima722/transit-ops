from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routes import trips

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TransitOps API")

app.include_router(trips.router)


@app.get("/")
def root():
    return {"message": "TransitOps API running"}