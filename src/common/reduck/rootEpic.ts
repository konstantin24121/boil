import { combineEpics } from 'redux-observable';
import userEpics from './modules/user/epics';

export const rootEpic = combineEpics(...userEpics);
