import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';

export enum ETypes {
  Inc = 'INCREMENT',
  Dec = 'DECREMENT',
}

export const Actions = {
  increment: () => createAction(ETypes.Inc),
  decrement: (count: number = 1) => createAction(ETypes.Dec, { count }),
};

export type TActions = ActionsUnion<typeof Actions>;
