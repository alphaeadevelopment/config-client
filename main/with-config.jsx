import React from 'react';
import loadConfig from './load-config';

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
