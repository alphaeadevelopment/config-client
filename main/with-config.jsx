
import React from 'react';
import loadConfig from './load-config';
import configService from './config-service';

export default Wrapped => (application) => {
  class HocComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        config: {},
      };
    }
    componentDidMount() {
      loadConfig('http://config-server-test.alphaea.uk', application, process.env.ENV)
        .then((config) => {
          debugger;
          configService.setConfig(config);
          this.setState({ config });
        });
    }
    render() {
      return (
        <div>
          <Wrapped config={this.state.config} {...this.props} />
        </div>
      );
    }
  }
  return HocComponent;
};
