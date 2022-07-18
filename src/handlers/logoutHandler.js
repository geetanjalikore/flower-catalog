const logoutHandler = (sessions) => (req, res, next) => {
  const { id } = req.cookies;
  const { url } = req;

  if (url === '/logout') {
    delete sessions[req.session[id]];
    req.session = null;
    res.redirect('/');
    return;
  }
  next();
};

module.exports = { logoutHandler };
