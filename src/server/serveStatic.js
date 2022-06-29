const fs = require('fs');
const mime = require('mime-types');

const serveStatic = (path) => {
  return (req, res) => {
    let { pathname } = req.url;
    if (pathname === '/') {
      pathname = '/index.html';
    }
    try {
      const fileName = path + pathname;
      const content = fs.readFileSync(fileName);
      res.setHeader('content-type', mime.lookup(fileName));
      res.setHeader('content-length', content.length);
      res.end(content);
    } catch (error) {
      return false;
    }
    return true;
  };
};

module.exports = { serveStatic };
