import requests
import os
from dotenv import load_dotenv

# read .env file
load_dotenv()
notion_key = os.getenv('NOTION_KEY')
notion_page = os.getenv('NOTION_PAGE_ID')


# Notion API endpoint
url = 'https://api.notion.com/v1/'
headers = {
    'Notion-Version': '2022-06-28',
    'Authorization': f'Bearer {notion_key}'
}

page_url = url+'pages/'+notion_page

response = requests.get(page_url, headers=headers)
print(response.text)
