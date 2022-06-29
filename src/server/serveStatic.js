const fs = require('fs');

const getExtension = (fileName) => fileName.split('.').slice(-1)[0];

const getContentType = (fileName) => {
  const contentTypes = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
    png: 'image/png',
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'img/gif',
    pdf: 'application/pdf'
  };

  const extension = getExtension(fileName);
  return contentTypes[extension];
};

const serveStatic = (path) => {
  return (req, res) => {
    let { pathname } = req.url;
    if (pathname === '/') {
      pathname = '/index.html';
    }
    try {
      const fileName = path + pathname;
      const content = fs.readFileSync(fileName);
      const contentType = getContentType(fileName);
      res.setHeader('content-type', contentType);
      res.end(content);
    } catch (error) {
      return false;
    }
    return true;
  };
};

module.exports = { serveStatic, getContentType };
