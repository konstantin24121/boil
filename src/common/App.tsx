import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

interface IAppProps extends RouteConfigComponentProps {}

export class App extends React.Component<IAppProps> {
  public render() {
    const { route } = this.props;
    return <ThemeProvider {...{ theme }}>{renderRoutes(route.routes)}</ThemeProvider>;
  }
}
