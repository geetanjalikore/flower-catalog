const notFoundHandler = (request, response, path) => {
  response.statusCode = 404;
  response.send('Invalid Request');
};

module.exports = { notFoundHandler };
