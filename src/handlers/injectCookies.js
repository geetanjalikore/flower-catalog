const parseCookies = (cookieString) => {
  const cookies = {};
  if (!cookieString) {
    return cookies;
  }
  cookieString.split(';').forEach(element => {
    const [name, value] = element.split('=');
    cookies[name.trim()] = value.trim();
  });
  return cookies;
};

const injectCookies = (req, res, next) => {
  console.log('cookies', req.headers.cookie);
  req.cookies = parseCookies(req.headers.cookie);
  next();
};

module.exports = { injectCookies };
