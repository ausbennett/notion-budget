from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime


class Entry(BaseModel):
    title: str
    price: float
    type: str
    date: datetime


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}
