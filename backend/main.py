import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from datetime import datetime
from dotenv import load_dotenv

# read .env file
load_dotenv()
notion_key = os.getenv('NOTION_KEY')
notion_page = os.getenv('NOTION_PAGE_ID')

app = FastAPI()

# Add CORS middleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

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
    notes: str
    date: datetime


@app.post("/expenses")
async def create_item(item: Entry):
    # Process the input data
    return {"name": item.title, "price": item.price, "type": item.type, "notes": item.notes, "date": item.date.strftime("%Y-%m-%d")}


@app.get("/categories")
def read_categories():
    return ["shopping", "food", "education", "bills", "health", "entertainment", "transport"]
