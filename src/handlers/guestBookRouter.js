const { addCommentHandler } = require('./addCommentHandler.js');
const { invalidReqMethod } = require("./invalidReqMethod.js");
const { showComments } = require('./apiHandlers/showComments.js');
const { showGuestBook } = require('./showGuestBook.js');
const { searchComment } = require('./apiHandlers/search.js');

const guestBookRouter = (comments, template, guestBookPath) => {
  return (req, res) => {
    const { pathname } = req.url;
    req.comments = comments;

    if (pathname === '/add-comment') {
      if (req.method === 'GET') {
        return addCommentHandler(req, res, guestBookPath);
      }
      return invalidReqMethod(req, res);
    }

    if (pathname === '/guestbook.html') {
      if (req.method === 'GET') {
        return showGuestBook(req, res, template);
      }
      return invalidReqMethod(req, res);
    }

    if (pathname === '/api.comments') {
      if (req.method === 'GET') {
        return showComments(req, res);
      }
      return invalidReqMethod(req, res);
    }

    if (pathname === '/api.search') {
      if (req.method === 'GET') {
        return searchComment(req, res);
      }
      return invalidReqMethod(req, res);
    }
    return false;
  };
};

module.exports = { guestBookRouter };

