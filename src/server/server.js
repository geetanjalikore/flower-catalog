const { createServer } = require('http');

const startServer = (port, router) => {
  const server = createServer((req, res) => {
    req.url = new URL(`http://${req.headers.host}${req.url}`);
    router(req, res);
  });

  server.listen(port, () => {
    console.log(`Listening at ${server.address().port}...`);
  });
};

module.exports = { startServer };
