const serveSignupPage = (req, res, next) => {
  res.sendFile('signup.html', { root: process.cwd() + '/public' });
};

module.exports = { serveSignupPage };
