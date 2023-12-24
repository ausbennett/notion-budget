import os

from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from dotenv import load_dotenv

# read .env file
load_dotenv()
notion_key = os.getenv('NOTION_KEY')
notion_page = os.getenv('NOTION_PAGE_ID')

app = FastAPI()

# Notion API endpoint
url = 'https://api.notion.com/v1'
headers = {
    'Notion-Version': '2022-06-28',
    'Authorization': f'Bearer {notion_key}'
}


class Entry(BaseModel):
    title: str
    price: float
    type: str
    date: datetime


@app.get("/")
def read_root():
    return {"Hello": "World"}
