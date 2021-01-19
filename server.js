const { Article, Author, lead_art, db } = require('./models/db');
const express = require('express');
const app = require('./app');
const PORT = 8000;

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Working on PORT ${PORT}`);
    })
  } catch(error) {
    console.error('Error starting server: ', error.message)
  }
}

init();
