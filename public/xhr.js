const td = (content) => {
  const element = document.createElement('td');
  element.innerText = content;
  return element;
};

const createCommentRow = (date, name, comment) => {
  const commentRow = document.createElement('tr');
  commentRow.appendChild(td(date));
  commentRow.appendChild(td(name));
  commentRow.appendChild(td(comment));

  return commentRow;
};

const createCommentsHtml = (comments) => {
  const tbody = document.createElement('tbody');

  comments.forEach(({ date, name, comment }) => {
    const commentRow = createCommentRow(date, name, comment);
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
  const xhrComments = new XMLHttpRequest();

  xhrComments.onload = () => {
    if (xhrComments.status === 201) {
      const comments = JSON.parse(xhrComments.responseText);
      resetForm();
      replaceComments(comments);
    }
  };

  xhrComments.open('GET', '/comments');
  xhrComments.send();
};

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  return new URLSearchParams(formData).toString();
}

const xhrAddComment = () => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) reqComments();
  };

  const comment = getFormData();
  xhr.open('POST', '/add-comment');
  xhr.send(comment);
};
