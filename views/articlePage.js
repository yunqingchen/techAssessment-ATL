const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (article) => layout(html`
  <h3>${article.title}
      <small> (<a href="/articles/${article.id}">${article.canonical_url}</a>)</small>
  </h3>
  <h4>by ${article['authors'].map((author, index) =>
    (index ? ', ' : '' ) + html`<a href="/authors/${author.id}">${author.slug}</a>`)}
  </h4>
  <ul>
    <li>published on ${article.published_date}</li>
    <li>${article.word_count} words</li>

  </ul>
  <hr/>
  <div class="article-body">$${article.dek}</div>
  <hr/>
  <a href="/articles/${article.id}/edit" class="btn btn-primary">edit this article</a>
  <form style='display:inline' method='POST' action='/articles/${article.id}?_method=DELETE'>
  <button class="btn btn-danger">delete this article</button>
  </form>
`);
