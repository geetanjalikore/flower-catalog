const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.end(`${req.url.pathname} not found`);
};

module.exports = { notFoundHandler };
