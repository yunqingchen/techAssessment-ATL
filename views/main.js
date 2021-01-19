const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (articles) => layout(html`
  <h3>Articles</h3>
  <ul class="list-unstyled">
    <ul>
      ${articles.map(article => html`<li><a href="/articles/${article.id}">${article.title}</a></li>`)}
    </ul>
  </ul>`);
