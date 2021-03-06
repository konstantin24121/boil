declare const __ENV__: boolean;
declare const __IS_SERVER_BUNDLE__: boolean;
declare const __DEVELOPMENT__: boolean;
declare const __APP_ID__: string;
declare const __BUGSNAG_ID__: string;
declare const __APP_META__: {
  version: string;
  name: string;
};

declare interface Window {
  __EMOTION_CRITICAL_IDS__: string[];
  __REDUX_INITIAL_STATE__: Partial<IRootState>;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}
