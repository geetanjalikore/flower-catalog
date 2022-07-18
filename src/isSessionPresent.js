const isSessionPresent = (req, res, next) => {
  if (!req.session.id) {
    res.redirect('/');
    return;
  }
  next();
};

module.exports = { isSessionPresent };
