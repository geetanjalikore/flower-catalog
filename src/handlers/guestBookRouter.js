const { addCommentHandler } = require('./addCommentHandler.js');
const { invalidReqMethod } = require("./invalidReqMethod.js");
const { showGuestBook } = require('./showGuestBook.js');

const guestBookRouter = (comments, template, guestBookPath) => {
  return (req, res) => {
    const { pathname } = req.url;

    if (pathname === '/add-comment') {
      if (req.method === 'GET') {
        req.comments = comments;
        return addCommentHandler(req, res, guestBookPath);
      }
      return invalidReqMethod(req, res);
    }

    if (pathname === '/guestbook.html') {
      if (req.method === 'GET') {
        req.comments = comments;
        return showGuestBook(req, res, template);
      }
      return invalidReqMethod(req, res);
    }
    return false;
  };
};

module.exports = { guestBookRouter };
