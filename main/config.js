import fetch from 'node-fetch';

class Config {

  constructor(url) {
    this.props = {};
    this.url = url;
  }
  init(app, profile, label) {
    const self = this;
    return new Promise((res, rej) => {
      fetch(`${this.url}/${app}${profile ? `-${profile}` : ''}${label ? `-${label}` : ''}.properties`)
        .then(d => d.body)
        .then(b => {
          return new Promise((res2, rej2) => {
            parseProperties(b).then(p => res2(p)).catch(e => rej2(e));
          });
        })
        .then(p => self.props = p)
        .then(() => res())
        .catch(e => rej(e));
    });
  }
  get(key) {
    return this.props[key];
  }
  getOr(key, defaultValue) {
    const v = this.get(key);
    return (v !== undefined) ? v : defaultValue
  }
  has(key) {
    return this.props[key] !== undefined;
  }
}

export default new Config();