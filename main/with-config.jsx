
import React from 'react';
import loadConfig from './load-config';
import configService from './config-service';

export default Wrapped => (application) => {
  class HocComponent extends React.Component {
    componentDidMount() {
      loadConfig(application, process.env.ENV)
        .then((config) => {
          configService.setConfig(config);
        })
        .catch((e) => {
          console.error('Failed to contact config server at %s', configServer);
          console.error('Error: %s', e.message);
        })
    }
    render() {
      return (
        <div>
          <Wrapped {...this.props} />
        </div>
      );
    }
  }
  return HocComponent;
};
