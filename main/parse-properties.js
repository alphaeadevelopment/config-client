import readline from 'readline';

export default (b) => {
  return new Promise((res, rej) => {
    const props = {}
    const rl = readline.createInterface({
      input: b,
    });
    let i = 0;
    rl.on('line', (l) => {
      const r = l.match(/^([^:]*?): (.*)$/)
      if (r) {
        const key = r[1];
        props[key] = r[2];
      }
    }).on('close', () => {
      res(props);
    });
  });
}
