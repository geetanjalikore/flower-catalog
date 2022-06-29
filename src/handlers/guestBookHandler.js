const { commentsHtml } = require('./createHtml.js');

const convertParams = (searchParams) => {
  const params = {};
  for (const [field, value] of searchParams.entries()) {
    params[field] = value;
  }
  return params;
};

function addCommentHandler(req, res, comments) {
  const { searchParams } = req.url;
  const params = convertParams(searchParams);
  params.date = new Date().toLocaleString();
  comments.unshift(params);

  res.statusCode = 302;
  res.setHeader('Location', '/guestbook.html');
  res.end('');

  return true;
}

const showGuestBook = (res, template, comments) => {
  const result = template.replace('__COMMENTS__', commentsHtml(comments));
  res.setHeader('content-type', 'text/html');
  res.setHeader('content-length', result.length);
  res.end(result);
  return true;
};

const guestBookHandler = (comments, template) => {
  return (req, res) => {
    const { pathname } = req.url;

    if (pathname === '/add-comment') {
      return addCommentHandler(req, res, comments);
    }

    if (pathname === '/guestbook.html') {
      return showGuestBook(res, template, comments);
    }
    return false;
  };
};

module.exports = { guestBookHandler };
