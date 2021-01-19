const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/clarksapp', { logging: false });

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const Article = db.define('article', {
  articleId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
  },
  dek: {
    type: Sequelize.STRING,
  },
  published_date: {
    type: Sequelize.DATE
  },
  canonical_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  word_count: {
    type: Sequelize.INTEGER,
  },
  tags: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  embeds: {
    type: Sequelize.STRING,
  }
})

const lead_art = db.define('lead_art', {
  type: {
    type: Sequelize.STRING,
  },
})

const Author = db.define('author', {
  slug: {
    type: Sequelize.STRING,
  }
})

Article.hasMany(lead_art);
Author.belongsToMany(Article, { through: 'Author_Articles'});
Article.belongsToMany(Author, { through: 'Author_Articles'});

module.exports = {
  Article, lead_art, Author, db
}

