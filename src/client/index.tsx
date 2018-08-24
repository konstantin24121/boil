import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './utils/hydrateEmotionsIds';

import { App } from '@common/App';

const dist = document.getElementById(__APP_ID__);
ReactDOM.hydrate(<App />, dist);
