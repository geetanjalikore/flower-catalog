const logRequest = (req, res) => {
  console.log(req.url.pathname);
  return false;
};

module.exports = { logRequest };
