const serverLoginPage = (path) => (req, res, next) => {
  if (!req.session.id) {
    res.sendFile('login.html', { root: process.cwd() + '/public' });
    return;
  }
  next();
};

module.exports = { serverLoginPage };
