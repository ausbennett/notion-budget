import requests
import notionParser

import os
from dotenv import load_dotenv

# read .env file
load_dotenv()
notion_key = os.getenv('NOTION_KEY')
notion_page = os.getenv('NOTION_PAGE_ID')


# Notion API endpoint
url = 'https://api.notion.com/v1'
headers = {
    'Notion-Version': '2022-06-28',
    'Authorization': f'Bearer {notion_key}'
}

# response = requests.get(url+'/databases/'+notion_page, headers=headers)

# data = response.json()
# with open('data.json', 'w') as file:
#     json.dump(data, file, indent=4)

# print("JSON data written to data.json")

# data = notionParser.new_expense("6ee0323fa1814ced9f976bb956289f8e", "2023-12-24", "Pizza", "food", 22.00, "popular")
# print(data)

# response = requests.post(url+'/pages', headers=headers, json=data)
# print(response.text)


# GETTING CATEGORY : CATEGORY_ID MAPPING

categories = {}

database_id = 'f1dd799ab58b43bf8d429c705b711beb'  # page_id of categories database
response = requests.post(
    url+'/databases/'+database_id+'/query', headers=headers)
data = response.json()


if 'results' in data:
    for item in data['results']:
        if item['object'] == 'page':
            category_id = item['id']
            category = item['properties']['Name']['title'][0]['text']['content']
            categories[category] = category_id

print(categories)
