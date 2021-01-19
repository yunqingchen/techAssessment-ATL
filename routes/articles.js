const express = require("express");
const router = express.Router();
const { Article, lead_art, Author } = require("../models/db");
const { main, articlePage, addArticle, editArticle } = require("../views");


// GET /articles
router.get("/", async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.send(main(articles));
  } catch (error) {
    next(error);
  }
});

// POST /articles
router.post("/", async (req, res, next) => {
  try {
    let articles = await Article.findAll({
      where: {
        canonical_url: req.body['canonical-url']
      }
    })

    console.log('articles>>>>>', articles);

    // alerts if canonical-url is blank or already in use
    if (!req.body['canonical-url'] || !req.body.id) res.send('article uuid or url cannot be blank');
    else if (articles.length > 1) res.send('url is already in use');

    let [ article, articleCreated ] = await Article.findOrCreate({
      where: {
        articleId: req.body.id,
        canonical_url: req.body['canonical-url']
      }
    });

    // article.canonical_url = req.body['canonical-url']
    if (article.title) article.title = req.body.title
    if (article.slug) article.slug = req.body['article-slug'];
    if (article.dek) article.dek = req.body.dek;
    if (article.published_date) article.published_date = req.body['published-date']
    if (article.word_count) article.word_count = req.body['word-count'];
    if (article.tags) article.tags = req.body.tags

    article = await article.save();

    const [ author, authorCreated ] = await Author.findOrCreate({
      where: {
        id: Math.floor(Math.random() * 10000),
        slug: req.body['author-slug']
      }
    })

    article.setAuthors(author);

    res.redirect("/articles/" + article.id);
  } catch (error) {
    console.log(error);
  }
});

// PUT /articles/:id
router.put("/:id", async (req, res, next) => {
  try {
    let articles = await Article.findAll({
      where: {
        canonical_url: req.body['canonical-url']
      }
    })

    // alerts if canonical-url is blank or already in use
    if (!req.body['canonical-url']) res.send('url cannot be blank');
    else if (articles.length >= 1) res.send('url is already in use');

    let article = await Article.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Author }]
    });

    // updates values
    article.canonical_url = req.body['canonical-url']
    article.title = req.body.title;
    article.slug = req.body['article-slug'];
    article.dek = req.body.dek;
    article.published_date = req.body['published-date']
    article.word_count = req.body['word-count'];
    article.tags = req.body.tags
    article.removeAuthors(article.authors)

    // updates authors
    let arrayOfAuthors = req.body['author-slug'].split(', ')
    for (let i = 0; i < arrayOfAuthors.length; i++) {
      let [ author, authorCreated ] = await Author.findAll({
        where: {
          slug: arrayOfAuthors[i]
        }
      })

      if (!author) author = await Author.create({
            id: Math.floor(Math.random() * 10000),
            slug: arrayOfAuthors[i]
      })

      article.addAuthor(author)
    }
    article = await article.save();

    res.redirect("/articles/" + article.id);
  } catch (error) {
    next(error);
  }
});

// DELETE /articles/:id
router.delete("/:id", async (req, res, next) => {
  try {
    await Article.destroy({
      where: {
        id: req.params.id
      }
    });

    res.redirect("/articles");
  } catch (error) {
    next(error);
  }
});

// GET /articles/add
router.get("/add", (req, res) => {
  res.send(addArticle());
});

// GET /articles/:id
router.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Author }]
    });
    if (article === null) {
      res.sendStatus(404);
    } else {
      res.send(articlePage(article));
    }
  } catch (error) {
    next(error);
  }
});

// GET /articles/:id/edit
router.get("/:id/edit", async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: {
        id: req.params.id
      },
    });

    if (article === null) {
      res.sendStatus(404);
    } else {
      const author = await article.getAuthors();
      res.send(editArticle(article, author));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
