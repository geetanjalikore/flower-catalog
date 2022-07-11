const receiveBodyParams = (req, res, next) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    req.bodyParams = new URLSearchParams(data);
    next();
  });
};

module.exports = { receiveBodyParams };
