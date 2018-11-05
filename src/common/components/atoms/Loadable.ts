import * as ReactLoadable from 'react-loadable';
import { Loading } from 'atoms/Loading';
import { Omit } from 'utils/Omit';

export const LoadableComponent = (
  options: Omit<ReactLoadable.OptionsWithoutRender<{}>, 'loading'>,
) =>
  ReactLoadable({
    loading: Loading,
    delay: 300,
    ...options,
  });
