import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './utils/hydrateEmotionsIds';

import { Root } from './Root';
import { configureStore } from '@common/reduck/store';

const store = configureStore();
const dist = document.getElementById(__APP_ID__);

ReactDOM.hydrate(<Root store={store} />, dist);
