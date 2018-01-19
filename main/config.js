import fetch from 'node-fetch';
import parseProperties from './parse-properties';

class Config {

  constructor() {
    this.props = {};
  }
  init(url, app, profile, label) {
    const self = this;
    return new Promise((res, rej) => {
      fetch(`${url}/${app}${profile ? `-${profile}` : ''}${label ? `-${label}` : ''}.properties`)
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
