const notFoundError = (request, response, path) => {
  response.statusCode = 404;
  response.send('Invalid Request');
};

module.exports = { notFoundError };
