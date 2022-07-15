const fs = require('fs');
const express = require('express');
const { logRequest } = require('./handlers/logRequest.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { logoutHandler } = require('./handlers/logoutHandler');
const { signUpHandler } = require('./handlers/signUpHandler.js');
const { searchComment } = require('./handlers/apiHandlers/search.js');
const { showComments } = require('./handlers/apiHandlers/showComments.js');
const { showGuestBook } = require('./handlers/showGuestBook.js');
const { addComment } = require('./handlers/addCommentHandler.js');
const { getComments } = require('./handlers/getComments.js');

const createGuestbookRouter = (templateFile, guestbook) => {
  const guestBookRouter = express.Router();

  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf8'));

  guestBookRouter.get('/guestbook.html', showGuestBook(comments, template));
  guestBookRouter.post('/add-comment', addComment(comments, guestbook));
  guestBookRouter.get('/comments', getComments(comments));
  guestBookRouter.get('/api.comments', showComments(comments));
  guestBookRouter.get(/\/api.search.*/, searchComment(comments));

  return guestBookRouter;
}

const createApp = ({ path, guestbook, templateFile, usersPath },
  sessions,
  logger
) => {

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  const app = express();

  app.use(logRequest(logger));
  app.use(express.urlencoded({ extended: true, }));
  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.get('/signup', signUpHandler(users, usersPath));
  app.post('/signup', signUpHandler(users, usersPath));

  app.use(loginHandler(users, sessions));
  app.use(express.static(path));

  app.get('/logout', logoutHandler(sessions));

  const guestBookRouter = createGuestbookRouter(templateFile, guestbook);
  app.use(guestBookRouter);

  return app;
}

module.exports = { createApp };

