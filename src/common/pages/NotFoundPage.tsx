import * as React from 'react';
import Helmet from 'react-helmet';
import { RouterStatus } from 'atoms/RouterStatus';

export class NotFoundPage extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <Helmet>
          <title>Not found</title>
        </Helmet>
        <RouterStatus status={404}>
          <div>404 dump ass</div>
        </RouterStatus>
      </>
    );
  }
}
