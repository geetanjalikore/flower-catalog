const logRequest = (logger) => (req, res, next) => {
  logger(req.url.pathname);
  next();
};

module.exports = { logRequest };
