import { combineEpics } from 'redux-observable';
import userEpics from './modules/user/epics';
import localeEpics from './modules/locale/epics';

export const rootEpic = combineEpics(...userEpics, ...localeEpics);
