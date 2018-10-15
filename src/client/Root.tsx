import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { router } from 'common/router';
import { BrowserRouter } from 'react-router-dom';

interface IRootProps {
  store: Store<IRootState>;
}

class PureRoot extends React.Component<IRootProps> {
  public render() {
    return (
      <Provider store={this.props.store} key="redux=provider">
        <BrowserRouter>{renderRoutes(router)}</BrowserRouter>
      </Provider>
    );
  }
}

const Root = hot(module)(PureRoot);
export { Root };
