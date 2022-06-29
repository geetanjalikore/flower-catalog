const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.end('Invalid Request');
};

module.exports = { notFoundHandler };
