import * as React from 'react';
import * as ReactDOM from 'react-dom';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';

import './utils/hydrateEmotionsIds';
import { getInitialState } from './utils/getInitialState';

import { Root } from './Root';
import { configureStore } from 'common/reduck/store';

const store = configureStore(getInitialState());
const dist = document.getElementById(__APP_ID__);

if (!__DEVELOPMENT__ && __BUGSNAG_ID__) {
  const bugsnagClient = bugsnag({
    apiKey: __BUGSNAG_ID__,
    appVersion: __APP_META__.version,
    releaseStage: 'production',
    metaData: {},
  });

  const ErrorBoundary = bugsnagClient.use(createPlugin(React));

  ReactDOM.hydrate(
    <ErrorBoundary>
      <Root store={store} />
    </ErrorBoundary>,
    dist,
  );
} else {
  ReactDOM.hydrate(<Root store={store} />, dist);
}
