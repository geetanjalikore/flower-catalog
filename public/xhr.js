const xhrReq = (method, url, status, cb, body) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (status === xhr.status) cb(xhr);
  };

  xhr.open(method, url);
  xhr.send(body);
};

const td = (content) => {
  const element = document.createElement('td');
  element.innerText = content;
  return element;
};

const createCommentRow = ({ date, name, comment }) => {
  const commentRow = document.createElement('tr');
  commentRow.appendChild(td(date));
  commentRow.appendChild(td(name));
  commentRow.appendChild(td(comment));

  return commentRow;
};

const createCommentsHtml = (comments) => {
  const tbody = document.createElement('tbody');

  comments.forEach(comment => {
    const commentRow = createCommentRow(comment);
    tbody.appendChild(commentRow);
  });

  return tbody;
};

const resetForm = () => {
  const form = document.querySelector('form');
  form.reset();
}

const replaceComments = (comments) => {
  const table = document.querySelector('table');
  const tbody = document.querySelector('tbody');

  table.removeChild(tbody);
  table.appendChild(createCommentsHtml(comments));
}

const reqComments = () => {
  cb = ({ responseText }) => {
    const comments = JSON.parse(responseText);
    resetForm();
    replaceComments(comments);
  };

  xhrReq('GET', '/comments', 200, cb);
};

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  return new URLSearchParams(formData);
};

const xhrAddComment = () => {
  const comment = getFormData();
  xhrReq('POST', '/add-comment', 201, reqComments, comment);
};
