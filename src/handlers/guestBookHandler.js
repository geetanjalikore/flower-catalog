const fs = require('fs');
const { commentsHtml } = require('./createHtml.js');
const { invalidReqMethod } = require('./invalidReqMethod.js');

const convertParams = (searchParams) => {
  const params = {};
  for (const [field, value] of searchParams.entries()) {
    params[field] = value;
  }
  return params;
};

function addCommentHandler(req, res, comments, guestBookPath) {
  const { searchParams } = req.url;
  const params = convertParams(searchParams);
  params.date = new Date().toLocaleString();
  comments.unshift(params);
  fs.writeFileSync(guestBookPath, JSON.stringify(comments), 'utf8');

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

const guestBookHandler = (comments, template, guestBookPath) => {
  return (req, res) => {
    const { pathname } = req.url;

    if (req.method !== 'GET') {
      return invalidReqMethod(req, res);
    }

    if (pathname === '/add-comment') {
      return addCommentHandler(req, res, comments, guestBookPath);
    }

    if (pathname === '/guestbook.html') {
      return showGuestBook(res, template, comments);
    }
    return false;
  };
};

module.exports = { guestBookHandler };
