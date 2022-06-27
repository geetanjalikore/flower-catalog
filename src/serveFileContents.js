const fs = require('fs');

const contentTypes = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
  html: 'text/html',
  txt: 'text/plain'
};

const getExtension = (fileName) => fileName.split('.').slice(-1)[0];

const pageHandler = (fileName, response) => {
  if (fs.existsSync(fileName)) {
    const extension = getExtension(fileName);
    const contentType = contentTypes[extension];
    const content = fs.readFileSync(fileName);
    response.setHeader('content-type', contentType);
    response.send(content);
    return true;
  }
  return false;
};

const generateHtml = (tag, content) => `<${tag}> ${content}</${tag}>`;

const commentsHtml = (allComments) => {
  let comments = '';

  allComments.forEach(({ date, name, comment }) => {
    const dateHtml = generateHtml('td', date);
    const nameHtml = generateHtml('td', name);
    const commentHtml = generateHtml('td', comment);
    comments += generateHtml('tr', `${dateHtml}${nameHtml}${commentHtml}`);
  });

  return generateHtml('table', comments);
};

const guestBookHandler = (fileName, response, commentsFile, templateFile) => {
  let template = fs.readFileSync(templateFile, 'utf8');
  const allComments = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const table = commentsHtml(allComments);
  template = template.replace('__COMMENTS__', table);
  fs.writeFileSync(fileName, template, 'utf8');

  return pageHandler(fileName, response);
};

const serveFileContents = (request, response, path, template) => {
  let { uri } = request;
  if (uri === '/') {
    uri = '/index.html';
  }
  const fileName = path + uri;
  if (uri === '/guestbook.html') {
    const commentsFile = './resources/comments.json';
    const templateFile = `./resources/${template}`;
    return guestBookHandler(fileName, response, commentsFile, templateFile);
  }
  return pageHandler(fileName, response);
};

exports.serveFileContents = serveFileContents;
