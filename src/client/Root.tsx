import * as React from 'react';
import { Provider } from 'react-redux';
import { App } from '@common/App';

interface IRootProps {
  store: any;
}

export class Root extends React.Component<IRootProps> {
  public render() {
    return (
      <Provider store={this.props.store} key="redux=provider">
        <App />
      </Provider>
    );
  }
}
