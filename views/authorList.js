const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (authors) => layout(html`
  <h3>Authors</h3>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${authors.map(author => html`<li>
        <a href="/authors/${author.id}">${author.slug}</a>
      </li>`)}
    </ul>
  </ul>
`);
