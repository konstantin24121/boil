export function getInitialState() {
  const initialState = { ...window.__REDUX_INITIAL_STATE__ };
  window.__REDUX_INITIAL_STATE__ = undefined;
  document.getElementById('serverState').remove();
  return initialState;
}
