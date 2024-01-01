/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})




app.get('/', (req, res) => {
  res.send('Hello From Backend')
})

app.get('/categories', (req, res) => {
  (async () => {
    const databaseId = process.env.NOTION_CATEGORIES_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response);
    res.send(response)
  })();
});

var ids = []
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