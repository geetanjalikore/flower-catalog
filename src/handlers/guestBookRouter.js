const { addCommentHandler } = require('./addCommentHandler.js');
const { showGuestBook } = require('./showGuestBook.js');

const guestBookRouter = (comments, template, guestBookPath) => {
  return (req, res, next) => {
    const { pathname } = req.url;
    req.comments = comments;

    if (pathname === '/add-comment' && req.method === 'POST') {
      addCommentHandler(req, res, guestBookPath);
      return;
    }

    if (pathname === '/guestbook.html' && req.method === 'GET') {
      showGuestBook(req, res, template);
      return;
    }

    if (pathname === '/comments' && req.method === 'GET') {
      res.statusCode = 201;
      res.end(JSON.stringify(comments));
      return;
    }

    next();
  }
};

module.exports = { guestBookRouter };

