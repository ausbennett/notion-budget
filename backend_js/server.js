/* eslint-disable no-undef */
require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

//Declare & Init Notion API Client 
const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_TOKEN, })

var categories = new Map()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello From Backend')
})

app.get('/categories', async (req, res) => {
  try {
    const databaseId = process.env.NOTION_CATEGORIES_ID;

    if (!databaseId) {
      // Handle the case where the database ID is not set
      return res.status(500).send("Server configuration error.");
    }

    //notion api query
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    if (response.hasOwnProperty('results')) {
      response.results.forEach(item => {
          if (item.object === 'page') {
              const category_id = item.id;
              const category = item.properties.Name.title[0].text.content;
              categories[category] = category_id;
          }
      });
    }
    console.log('Got categories:');
    console.log(categories);
    res.send(Object.keys(categories));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

/*
{
  title: 'Hello',
  price: 120,
  type: 'bills',
  notes: '',
  date: '2024-01-01T22:30:29.796Z'
}
 */

app.post('/expense', async (req,res) => {
  data = req.body
  const properties = { // 'Name' is the property name in your Notion database   
    'name': {
        title: [
            {
                text: {
                    content: data.title
                }
            }
        ]
    },
    'amount': {
        'number': data.price
    },
    'notes':{
        'rich_text': [
            {
                'text': {
                    'content': data.notes
                }
            }
        ]
    }

  }
  try {
    const response = await notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: properties,
    });
    console.log(response);
    console.log("New entry added to the database");
    res.sendStatus(200)
} catch (error) {
    console.error(error.body);
    res.sendStatus(500)
}
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});