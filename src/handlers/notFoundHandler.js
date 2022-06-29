const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.end('Invalid Request');
};

module.exports = { notFoundHandler };
