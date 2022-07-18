const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const { serveSignupPage } = require('./handlers/serveSignupPage.js');
const { serverLoginPage } = require('./handlers/serveLoginPage.js');
const { isSessionPresent } = require('./handlers/isSessionPresent.js');
const { loginHandler } = require('./handlers/loginHandler.js');
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
  guestBookRouter.get('/api/comments', showComments(comments));
  guestBookRouter.get(/\/api\/search.*/, searchComment(comments));

  return guestBookRouter;
}

const createApp = ({ path, guestbook, templateFile, usersPath, sessionsPath },
  sessions
) => {

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  const app = express();

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true, }));

  app.use(cookieParser());
  app.use(cookieSession({
    name: 'session',
    keys: ['key1']
  }));

  app.get('/signup.html', serveSignupPage);
  app.post('/signup', signUpHandler(users, usersPath));

  app.get('/', serverLoginPage(path));
  app.use(loginHandler(users, sessions, sessionsPath));
  app.use(isSessionPresent);
  app.use(express.static(path));
  app.get('/logout', logoutHandler(sessions));

  const guestBookRouter = createGuestbookRouter(templateFile, guestbook);
  app.use(guestBookRouter);

  return app;
}

module.exports = { createApp };

