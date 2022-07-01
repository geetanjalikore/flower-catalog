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

    if (pathname === '/guestbook.html' && req.method == 'GET') {
      showGuestBook(req, res, template);
      return;
    }
    next();
  }
};

module.exports = { guestBookRouter };

