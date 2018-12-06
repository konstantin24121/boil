import * as React from 'react';
import * as ReactDOM from 'react-dom';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
import * as Loadable from 'react-loadable';
import './utils/hydrateEmotionsIds';
import { getInitialState } from './utils/getInitialState';

import { Root } from './Root';
import { configureStore } from 'common/reduck/store';

const store = configureStore(getInitialState());
const dist = document.getElementById(__APP_ID__);

const renderApp = (component) => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(component, dist);
  });
};

if (!__DEVELOPMENT__ && __BUGSNAG_ID__) {
  const bugsnagClient = bugsnag({
    apiKey: __BUGSNAG_ID__,
    appVersion: __APP_META__.version,
    releaseStage: 'production',
    metaData: {},
  });

  const ErrorBoundary = bugsnagClient.use(createPlugin(React));

  renderApp(
    <ErrorBoundary>
      <Root store={store} />
    </ErrorBoundary>,
  );
} else {
  renderApp(<Root store={store} />);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
