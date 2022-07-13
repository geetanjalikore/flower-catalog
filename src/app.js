const fs = require('fs');
const { createRouter, notFoundHandler } = require('server');
const { serveStatic } = require('./server/serveStatic.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { logRequest } = require('./handlers/logRequest.js');
const { receiveBodyParams } = require('./handlers/receiveBodyParams.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { logoutHandler } = require('./handlers/logoutHandler');
const { signUpHandler } = require('./handlers/signUpHandler.js');
const { guestBookApi } = require('./handlers/apiHandlers/guestBookApi.js');
const { parseSearchParams } = require('./handlers/parseSearchParams.js');

const app = ({ path, guestbook, templateFile, userCredentialsPath }, sessions) => {
  const template = fs.readFileSync(templateFile, 'utf8');
  const comments = JSON.parse(fs.readFileSync(guestbook, 'utf8'));
  const users = JSON.parse(fs.readFileSync(userCredentialsPath, 'utf8'));

  return createRouter(
    receiveBodyParams,
    parseBodyParams,
    parseSearchParams,
    logRequest,
    injectCookies,
    injectSession(sessions),
    signUpHandler(users, userCredentialsPath),
    loginHandler(users, sessions),
    logoutHandler(sessions),
    guestBookApi(comments),
    guestBookRouter(comments, template, guestbook),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { app };
