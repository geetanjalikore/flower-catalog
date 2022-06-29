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

module.exports = { commentsHtml };
