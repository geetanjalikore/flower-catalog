const generateHtml = (tag, content) => `<${tag}> ${content}</${tag}>`;

const commentsHtml = (allComments) => {
  let comments = '';

  allComments.forEach(({ date, name, comment }) => {
    const dateHtml = generateHtml('td', date);
    const nameHtml = generateHtml('td', name);
    const commentHtml = generateHtml('td', comment);
    comments += generateHtml('tr', `${dateHtml}${nameHtml}${commentHtml}`);
  });

  return comments;
};

module.exports = { commentsHtml };
