const { createRouter, notFoundHandler } = require('server');
const { serveStatic } = require('./server/serveStatic.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logRequest } = require('./handlers/logRequest.js');
const { receiveBodyParams } = require('./handlers/parseBodyParams.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');
const { logoutHandler } = require('./handlers/logoutHandler');
const { signUpHandler } = require('./handlers/signUpHandler.js');

const app = (path,
  comments,
  template,
  guestBookPath,
  users,
  userCredentialsPath
) => {
  const sessions = {};

  return createRouter(
    receiveBodyParams,
    parseParams,
    logRequest,
    injectCookies,
    injectSession(sessions),
    signUpHandler(users, userCredentialsPath),
    loginHandler(users, sessions),
    logoutHandler(sessions),
    guestBookRouter(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { app };
