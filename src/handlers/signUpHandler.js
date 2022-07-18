const fs = require('fs');

const signUpHandler = (users, usersPath) => (req, res, next) => {
  const { url } = req;

  if (url === '/signup') {
    users.push(req.body);
    fs.writeFileSync(usersPath, JSON.stringify(users), 'utf8');
    res.redirect('/');
    return;
  }
  next();
};

module.exports = { signUpHandler };
