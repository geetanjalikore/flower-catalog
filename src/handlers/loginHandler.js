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
      <form action="/login" method="post">
        <div><label for="username">
          <input type="text" name="username" id="username">
        </label></div><br/>
        <div><input type="submit" value="Login"></div>
      </form>
    </body>
</html>`;

const loginHandler = (sessions) => {
  return (req, res, next) => {
    const { pathname } = req.url;

    if (pathname !== '/login') {
      if (!req.session) {
        res.statusCode = 401;
        res.end('Access Denied !!!');
        return;
      }
      next();
      return;
    }

    if (req.method === 'GET' && !req.session) {
      res.setHeader('content-type', 'text/html');
      res.end(loginPage);
      return;
    }

    const { bodyParams: { username } } = req;
    if (username) {
      const session = createSession(username);
      sessions[session.id] = session;

      res.setHeader('Set-Cookie', `id=${session.id}`);
      res.setHeader('Location', '/index.html');
      res.statusCode = 302;
      res.end();
      return;
    }
    next();
  };
};

module.exports = { loginHandler };
