import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { injectGlobal } from 'react-emotion';

interface IAppProps extends RouteConfigComponentProps {}

export class App extends React.Component<IAppProps> {
  public constructor(props) {
    super(props);
    applyGlobalStyles();
  }
  public render() {
    const { route } = this.props;
    return <ThemeProvider {...{ theme }}>{renderRoutes(route.routes)}</ThemeProvider>;
  }
}

const applyGlobalStyles = () => injectGlobal`
  body{
    background: ${theme.bgColor};
    color: ${theme.color};
  }

  a:link, a:visited {
    color: ${theme.colorAccented};
  }
`;
