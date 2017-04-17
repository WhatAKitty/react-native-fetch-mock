
const prueUrl = (url) => {
  const index = url.indexOf('?');
  const result = index > -1 ? url.substring(0, index) : url;
  return result;
}

export {
  prueUrl,
}
