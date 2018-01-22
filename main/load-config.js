import fetch from 'node-fetch';
import parseProperties from './parse-properties';

const parseProps = (t) => {
  const lines = t.split('\n');
  return parseProperties(lines);
};

export default (app, profile, label) => {
  const url = process.env.CONFIG_SERVER;
  if (!url) "missing env variable CONFIG_SERVER";
  return new Promise((res, rej) => {
    fetch(`${url}/${app}${profile ? `-${profile}` : ''}${label ? `-${label}` : ''}.properties`)
      .then(d => d.text())
      .then(b => res(parseProps(b)))
      .catch(e => rej(e));
  });
}
