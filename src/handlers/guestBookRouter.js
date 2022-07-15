const { addCommentHandler } = require('./addCommentHandler.js');
const { showGuestBook } = require('./showGuestBook.js');

const guestBookRouter = (comments, template, guestBookPath) => {
  return (req, res, next) => {
    const { url } = req;
    req.comments = comments;

    if (url === '/add-comment' && req.method === 'POST') {
      addCommentHandler(req, res, guestBookPath);
      return;
    }

    if (url === '/guestbook.html' && req.method === 'GET') {
      showGuestBook(req, res, template);
      return;
    }

    if (url === '/comments' && req.method === 'GET') {
      res.json(comments);
      return;
    }
    next();
  }
};

module.exports = { guestBookRouter };

