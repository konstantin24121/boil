import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

interface IProps extends LoadingComponentProps {}

export class Loading extends React.Component<IProps> {
  public render() {
    return <span>Loading...</span>;
  }
}
