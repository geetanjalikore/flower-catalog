const fs = require('fs');

const getExtension = (fileName) => fileName.split('.').slice(-1)[0];

const getContentType = (fileName) => {
  const contentTypes = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
    png: 'image/png',
    html: 'text/html',
    txt: 'text/plain'
  };
  const extension = getExtension(fileName);
  return contentTypes[extension];
};

const pageHandler = (fileName, response) => {
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', getContentType(fileName));
    response.setHeader('content-length', content.length);
    response.send(content);
    return true;
  }
  return false;
};

const generateHtml = (tag, content) => `<${tag}> ${content}</${tag}>`;

const commentsHtml = (allComments) => {
  const thead = '<tr><th>Date</th><th>Name</th><th>Comment</th></tr>';
  let comments = '';

  allComments.forEach(({ date, name, comment }) => {
    const dateHtml = generateHtml('td', date);
    const nameHtml = generateHtml('td', name);
    const commentHtml = generateHtml('td', comment);
    comments += generateHtml('tr', `${dateHtml}${nameHtml}${commentHtml}`);
  });

  return generateHtml('table', thead + comments);
};

const guestBookHandler = (fileName, response, commentsFile, templateFile) => {
  let template = fs.readFileSync(templateFile, 'utf8');
  const allComments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const table = commentsHtml(allComments);

  template = template.replace('__COMMENTS__', table);
  fs.writeFileSync(fileName, template, 'utf8');

  return pageHandler(fileName, response);
};

const serveFileContents = (request, response, path, commentsFile, template) => {
  let { uri } = request;
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = path + uri;
  if (uri === '/guestbook.html') {
    return guestBookHandler(fileName, response, commentsFile, template);
  }

  return pageHandler(fileName, response);
};

module.exports = { serveFileContents, guestBookHandler };
