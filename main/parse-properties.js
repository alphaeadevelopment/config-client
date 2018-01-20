export default (lines) => {
  const props = {}
  for (let l of lines) {
    const r = l.match(/^([^:]*?): (.*)$/)
    if (r) {
      const key = r[1];
      props[key] = r[2];
    }
  }
  return props;
}
