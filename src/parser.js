const removeSpecialChars = (text) => {
  const letters = text.split('%0D%0A').join(' ');
  return letters.split('+').join(' ');
};

const splitParams = (paramsString) => {
  const params = {};
  const rawParams = paramsString.split('&');

  rawParams.forEach(param => {
    const [name, value] = param.split('=');
    params[name] = removeSpecialChars(value);
  });
  return params;
};

const parseReqLine = line => {
  let params = {};
  const [method, rawUri, protocol] = line.split(' ');
  const [uri, paramsString] = rawUri.split('?');

  if (paramsString) {
    params = splitParams(paramsString);
  }
  return { method, uri, params, protocol };
};

const extractField = (line) => {
  const endOfKey = line.indexOf(':');
  const name = line.slice(0, endOfKey).toLowerCase();
  const value = line.slice(endOfKey + 1).trim();
  return { name, value };
};

const parseHeader = (lines) => {
  const headers = {};
  let index = 0;

  while (index < lines.length && lines[index].length > 1) {
    const { name, value } = extractField(lines[index]);
    headers[name] = value;
    index++;
  }

  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const reqLine = parseReqLine(lines[0]);
  console.log(reqLine);
  const headers = parseHeader(lines.slice(1));
  return { ...reqLine, headers };
};

module.exports = { parseReqLine, parseHeader, parseRequest, extractField };
