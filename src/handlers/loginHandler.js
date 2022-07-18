function createSession(username) {
  const date = new Date();
  const id = date.getTime();
  const session = { id, username, date };
  return session;
}

const loginPage = `
<html>
    <head>
      <title>Login</title>
    </head>

    <body>
      <form action="/" method="post">
        <div><label for="username">username : </label>
          <input type="text" name="username" id="username">
        </div><br/>
        <div><label for="password">Password : </label>
          <input type="password" name="password" id="password">
        </div><br/>
        <div><input type="submit" value="Login"></div>
      </form>
    </body>
</html>`;

const isRegistered = (loginUsername, loginPassword, users) => {
  return users.find(({ username, password }) => {
    return username === loginUsername && password === loginPassword;
  });
};

const loginHandler = (users, sessions, sessionsPath) => {
  return (req, res, next) => {
    const { url } = req;
    if (url !== '/') {
      console.log('session', req.session);
      if (!req.session) {
        res.statusCode = 401;
        res.end('Access Denied !!! Login to access the flower-catalog');
        return;
      }
      next();
      return;
    }

    if (req.method === 'GET' && !req.session) {
      res.end(loginPage);
      return;
    }

    const { username, password } = req.body;
    if (!isRegistered(username, password, users)) {
      res.statusCode = 401;
      res.end('Please register your details');
      return;
    }

    const session = createSession(username);
    sessions[session.id] = session;

    res.cookie('id', `${session.id}`);
    res.redirect('/index.html');
  };
};

module.exports = { loginHandler };
