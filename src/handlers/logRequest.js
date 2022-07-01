const logRequest = (req, res, next) => {
  console.log(req.url.pathname);
  next();
};

module.exports = { logRequest };
