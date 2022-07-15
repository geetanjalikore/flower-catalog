const logRequest = (logger) => (req, res, next) => {
  logger(req.url);
  next();
};

module.exports = { logRequest };
