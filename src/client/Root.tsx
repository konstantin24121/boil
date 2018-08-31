import * as React from 'react';
import { Provider } from 'react-redux';
import { App } from 'common/App';
import { Store } from 'redux';
import { hot } from 'react-hot-loader';

interface IRootProps {
  store: Store<IRootState>;
}

class PureRoot extends React.Component<IRootProps> {
  public render() {
    return (
      <Provider store={this.props.store} key="redux=provider">
        <App />
      </Provider>
    );
  }
}

const Root = hot(module)(PureRoot);
export {Root};
