'use strict'

const { Article, lead_art, Author, db } = require('./models/db')
const faker = require('faker')

const DUMMY_DATA_AMOUNT = 100

const authors = []

for (let i = 0; i < DUMMY_DATA_AMOUNT; i++) {
  const id = i + 1
  const authorName = `${faker.name.lastName()}-${faker.name.firstName()}`
  const author = {
    id,
    slug: authorName
  }
  authors.push(author)
}

const articles = []

for (let i = 0; i < DUMMY_DATA_AMOUNT; i++) {
  const articleId = faker.random.uuid()
  const slug = faker.lorem.words(6)
  const title = faker.lorem.word(4);
  const dek = faker.lorem.sentences(2)
  const published_date = faker.date.recent()
  const canonical_url = faker.internet.url()
  const word_count = Math.floor(Math.random() * 1000)
  const tags = ''
  const embeds = null
  const article = {
    articleId,
    slug,
    title,
    dek,
    published_date,
    canonical_url,
    word_count,
    tags,
    embeds,
  }
  articles.push(article)
}

const artImages = []

for (let i = 0; i < DUMMY_DATA_AMOUNT; i++) {
  const id = Math.ceil(Math.random() * 1000000)
  const type = 'image_large'
  const artImage = {
    id,
    type
  }
  artImages.push(artImage)
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(articles.map(article => Article.create(article)))

  await Promise.all(authors.map(author => Author.create(author)))

  await Promise.all(
    artImages.map(artImage => lead_art.create(artImage))
  )

  // associating articles to authors and vice versa
  for (let i = 1; i <= DUMMY_DATA_AMOUNT; i++) {
    let article = await Article.findByPk(i);
    let author1 = await Author.findByPk(Math.floor(Math.random() * DUMMY_DATA_AMOUNT));
    let author2 = await Author.findByPk(Math.floor(Math.random() * DUMMY_DATA_AMOUNT));

    await article.addAuthor(author1);
    await article.addAuthor(author2);
  }

  // associates specific articles to an author
  for (let i = 1; i <= DUMMY_DATA_AMOUNT; i++) {
    let author = await Author.findByPk(i);
    let article1 = await Article.findByPk(Math.floor(Math.random() * DUMMY_DATA_AMOUNT));
    let article2 = await Article.findByPk(Math.floor(Math.random() * DUMMY_DATA_AMOUNT));

    await author.addArticle(article1);
    await author.addArticle(article2);
    // await article1.addAuthor(author);
    // await article2.addAuthor(author);
  }

  // associates lead_art to an article
  for (let i = 1; i < DUMMY_DATA_AMOUNT; i++) {
    let article = await Article.findByPk(i);
    let image = await lead_art.findByPk(artImages[i].id);
    await article.addLead_art(image);
  }

  console.log(`seeded ${articles.length} articles successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// execute the `seed` function if we ran this module directly (`node seed`)
if (module === require.main) {
  runSeed()
}

// export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
