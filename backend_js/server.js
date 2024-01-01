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
var ids = []

app.use(cors())

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



app.get('/database', (req,res) => {
  (async () => {
    try {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
      });
      
      ids = response.results.map(item => item.id)
      console.log(ids);
      res.send("Successfully Got ids");
    } catch (error) {
      console.error(error.body);
      res.send(error);
    }
  })()
})

app.get('/ids', (req, res) => {
  (async () => {
    try{
      for (const id of ids){
        const response = await notion.pages.retrieve({
          page_id: id
        })
        console.log(response);
      }
      res.send('Done')
    } catch(error){
      console.error(error.body);
      res.send(error);
    }
  })()
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});