const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (article, authors) => layout(html`
  <h3>Edit an Article</h3>
  <hr>
  <form method="POST" action="/articles/${article.id}?_method=PUT">

  <div class="form-group">
  <label for="id" class="col-sm-2 control-label">article id (uuid)</label>
  <div class="col-sm-10">
    ${article.articleId}
      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="canonical-url" class="col-sm-2 control-label">canonical url</label>
      <div class="col-sm-10">
      <span class="asterisk_input">  </span>
      <textarea name="title">${article.canonical_url} </textarea>
      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">title</label>
      <div class="col-sm-10">
      <textarea name="title">${article.title ? article.title : ''} </textarea>
      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="author-slug" class="col-sm-2 control-label">author</label>
      <div class="col-sm-10">
      <textarea name="author-slug" style="resize:vertical">${authors.map((author, i) => (i ? ', ':'' ) + html`${author.slug}`)}</textarea>


      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="article-slug" class="col-sm-2 control-label">slug</label>
      <div class="col-sm-10">
      <textarea name="article-slug">${article.slug ? article.slug : ''}</textarea>
      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="dek" class="col-sm-2 control-label">dek</label>
      <div class="col-sm-10">
        <textarea name="dek">${article.dek ? article.dek : ''}</textarea>
      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="published-date" class="col-sm-2 control-label">date published</label>
      <div class="col-sm-10">
      <textarea name="published-date">${article.published_date ? article.published_date : ''}</textarea>

      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="word-count" class="col-sm-2 control-label">word count</label>
      <div class="col-sm-10">
        <input name="word-count" type="text" class="form-control" value=${article.word_count ? article.word_count : ''}> </input>
      </div>
    </div>

    &nbsp

    <div class="form-group">
      <label for="tags" class="col-sm-2 control-label">tags</label>
      <div class="col-sm-10">
        <input name="tags" type="text" class="form-control" value=${article.tags ? article.tags : ''}> </input>
      </div>
    </div>

    &nbsp

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
