const { createRouter, notFoundHandler } = require('server');
const { serveStatic } = require('./server/serveStatic.js');
const { guestBookRouter } = require('./handlers/guestBookRouter.js');
const { parseParams } = require('./handlers/parseParams.js');
const { logRequest } = require('./handlers/logRequest.js');
const { receiveBodyParams } = require('./handlers/parseBodyParams.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { injectCookies } = require('./handlers/injectCookies.js');
const { injectSession } = require('./handlers/injectSession.js');

const sessions = {};

const app = (path, comments, template, guestBookPath) => {
  return createRouter(
    receiveBodyParams,
    parseParams,
    logRequest,
    injectCookies,
    injectSession(sessions),
    loginHandler(sessions),
    guestBookRouter(comments, template, guestBookPath),
    serveStatic(path),
    notFoundHandler
  );
};

module.exports = { app };
