import * as actions from './actions';

export namespace UserModule {
  export type IState = { readonly count: number };
  export const Actions = actions.Actions;
  export type TActions = actions.TActions;
}
