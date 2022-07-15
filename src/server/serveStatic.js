const fs = require('fs');

const invalidReqMethod = (req, res) => {
  res.statusCode = 405;
  res.end('Invalid request method');
  return true;
};


const serveStatic = (path) => {
  return (req, res, next) => {

    if (req.method !== 'GET') {
      return invalidReqMethod(req, res);
    }

    const fileName = req.url;
    try {
      const content = fs.readFileSync(fileName);
      res.end(content);
    } catch (error) {
      next();
    }
  };
};

module.exports = { serveStatic };
