const fs = require('fs');

const signUpPage = `
<html>

<head>
  <title>sign-up</title>
</head>

<body>
  <form action="signup" method="post">
    <div>
      <label for="username">Username : </label>
      <input type="text" name="username" id="username">
    </div>
    <div>
      <label for="password"> Password : </label>
      <input type="password" name="password" id="password">
    </div>
    <div>
      <input type="submit" value="SIGN-UP">
    </div>
  </form>
</body>
</html>`;

const signUpHandler = (users, usersPath) => (req, res, next) => {
  const { url } = req;

  if (url !== '/signup') {
    next();
    return;
  }

  if (req.method === 'GET') {
    res.setHeader('content-type', 'text/html');
    res.end(signUpPage);
    return;
  }

  users.push(req.body);
  fs.writeFileSync(usersPath, JSON.stringify(users), 'utf8');
  res.end('Registered successfully!!');
};

module.exports = { signUpHandler };
