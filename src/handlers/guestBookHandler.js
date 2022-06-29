const fs = require('fs');
const { commentsHtml } = require('./createCommentsHtml.js');

const convertParams = (searchParams) => {
  const params = {};
  for (const [field, value] of searchParams.entries()) {
    params[field] = value;
  }
  return params;
};

function addCommentHandler(req, res, guestBookPath) {
  const { searchParams } = req.url;
  const { comments } = req;
  const params = convertParams(searchParams);
  params.date = new Date().toLocaleString();
  comments.unshift(params);
  fs.writeFileSync(guestBookPath, JSON.stringify(comments), 'utf8');

  res.statusCode = 302;
  res.setHeader('Location', '/guestbook.html');
  res.end('');

  return true;
}

const showGuestBook = ({ comments }, res, template) => {
  const result = template.replace('__COMMENTS__', commentsHtml(comments));

  res.setHeader('content-type', 'text/html');
  res.setHeader('content-length', result.length);
  res.end(result);
  return true;
};

const invalidReqMethod = (req, res) => {
  res.statusCode = 405;
  res.end('Invalid request method');
  return true;
};

const guestBookHandler = (comments, template, guestBookPath) => {
  const methodsAllowed = {
    '/add-comment': { 'GET': addCommentHandler },
    '/guestbook.html': { 'GET': showGuestBook }
  };

  return (req, res) => {
    const { pathname } = req.url;
    const { method } = req;

    if (pathname === '/add-comment') {
      const handler = methodsAllowed[pathname][method];
      if (handler) {
        req.comments = comments;
        return handler(req, res, guestBookPath);
      }
      return invalidReqMethod(req, res);
    }

    if (pathname === '/guestbook.html') {
      const handler = methodsAllowed[pathname][method];
      if (handler) {
        req.comments = comments;
        return handler(req, res, template);
      }
      return invalidReqMethod(req, res);
    }
    return false;
  };
};

module.exports = { guestBookHandler };
