const logoutHandler = (sessions) => (req, res, next) => {
  const { id } = req.cookies;
  const { url } = req;

  if (url === '/logout') {
    delete sessions[req.session[id]];
    res.clearCookie('id');
    res.end('Logged out successfully');
    return;
  }
  next();
};

module.exports = { logoutHandler };
