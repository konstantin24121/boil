import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { router } from 'common/router';

interface IRootProps {
  store: Store<IRootState>;
  context: {};
  url: string;
}

export class Root extends React.Component<IRootProps> {
  public render() {
    const { context, store, url } = this.props;
    return (
      <Provider store={store} key="redux=provider">
        <StaticRouter context={context} location={url}>
          {renderRoutes(router)}
        </StaticRouter>
      </Provider>
    );
  }
}
