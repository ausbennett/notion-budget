from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime


class Entry(BaseModel):
    title: str
    price: float
    type: str
    date: datetime


app = FastAPI()


@app.post("/")
async def create_entry(entry: Entry):
    return entry
