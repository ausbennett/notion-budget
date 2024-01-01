import os

import requests
import notionParser

from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
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


class Entry(BaseModel):
    title: str
    price: float
    type: str
    notes: str
    date: datetime


# Notion API endpoint
url = 'https://api.notion.com/v1'
headers = {
    'Notion-Version': '2022-06-28',
    'Authorization': f'Bearer {notion_key}'
}

database_id = "6ee0323fa1814ced9f976bb956289f8e"

# Categories
categories = {}

category_db = 'f1dd799ab58b43bf8d429c705b711beb'  # page_id of categories database
response = requests.post(
    url+'/databases/'+category_db+'/query', headers=headers)
data = response.json()

if 'results' in data:
    for item in data['results']:
        if item['object'] == 'page':
            category_id = item['id']
            category = item['properties']['Name']['title'][0]['text']['content']
            categories[category] = category_id


@app.post("/expenses")
async def create_item(item: Entry):
    # Process the input data
    # data = {"name": item.title, "price": item.price,
    #         "type": categories[item.type], "notes": item.notes, "date": item.date.strftime("%Y-%m-%d")}
    body = notionParser.new_expense(database_id, item.date.strftime(
        "%Y-%m-%d"), item.title, categories[item.type], item.price, item.notes)
    print(body)
    return body
    # use function to format into JSON payload
    # send request to NOTION API


@app.get("/categories")
async def read_categories():
    # figure out how I can get the "category: pageID" mapping
    return list(categories.keys())
