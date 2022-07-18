const createSession = (username) => {
  const date = new Date();
  const id = date.getTime();
  const session = { id, username, date };
  return session;
};

const isRegistered = (loginUsername, loginPassword, users) => {
  return users.find(({ username, password }) => {
    return username === loginUsername && password === loginPassword;
  });
};

const loginHandler = (users, sessions, sessionsPath) => {
  return (req, res, next) => {
    const { url } = req;

    if (url === '/login') {
      const { username, password } = req.body;

      if (!isRegistered(username, password, users)) {
        res.redirect('/signup.html');
        return
      }

      const session = createSession(username);
      req.session = session;
      sessions[session.id] = session;

      res.redirect('/index.html');
    }

    next();
    return;
  };
};

module.exports = { loginHandler };
