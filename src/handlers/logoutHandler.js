const logoutHandler = (sessions) => (req, res, next) => {
  const { id } = req.cookies;
  const { pathname } = req.url;

  if (pathname === '/logout') {
    delete sessions[req.session[id]];
    res.setHeader('Set-Cookie', `id=${id};max-age=0`);
    res.end('Logged out successfully');
    return;
  }
  next();
};

module.exports = { logoutHandler };
