const express = require("express");
const router = express.Router();
const { Article, lead_art, Author } = require("../models/db");
const { authorList, authorPage} = require('../views');

// GET /authors
router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.findAll();
    res.send(authorList(authors));
  } catch (error) {
    next(error);
  }
});

// GET /authors/:authorId
router.get("/:id", async (req, res, next) => {
  try {
    const author = await Author.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Article }]
    });

    if (author === null) {
      res.sendStatus(404);
    } else {
      res.send(authorPage(author, author['articles']));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;


