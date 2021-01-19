const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (author, articles) => layout(html`
  <h3>Articles written by ${author.slug}</h3>
  <hr>

  <hr>
  <ul class="list-unstyled">
    <ul>
      ${articles.map(article => html`<li><a href="/articles/${article.id}">${article.title}</a></li>`)}
    </ul>
  </ul>
`);



