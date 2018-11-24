export function getInitialState() {
  const initialState = { ...window.__REDUX_INITIAL_STATE__ };
  window.__REDUX_INITIAL_STATE__ = undefined;
  if (!__DEVELOPMENT__) {
    document.getElementById('serverState').remove();
  }
  return initialState;
}
