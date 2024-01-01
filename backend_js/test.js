require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID

const properties = { // 'Name' is the property name in your Notion database   
    'name': {
        title: [
            {
                text: {
                    content: "Hello Desmond"
                }
            }
        ]
    },
    'amount': {
        'number': 123.0
    },
    'notes':{
        'rich_text': [
            {
                'text': {
                    'content': 'hello'
                }
            }
        ]
    }
}

async function addDatabaseEntry(databaseId, properties) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: properties,
        });
        console.log(response);
        console.log("New entry added to the database");
    } catch (error) {
        console.error(error.body);
    }
}

addDatabaseEntry(databaseId, properties);