const invalidReqMethod = (req, res) => {
  res.statusCode = 405;
  res.end('Invalid request method');
  return true;
};
exports.invalidReqMethod = invalidReqMethod;
