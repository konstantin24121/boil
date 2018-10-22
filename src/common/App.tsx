import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { injectGlobal } from 'react-emotion';
import { prefetchData } from 'utils/prefetchData';

interface IAppProps extends RouteConfigComponentProps {
  store: IRootState;
}

export class App extends React.Component<IAppProps> {
  public constructor(props) {
    super(props);
    applyGlobalStyles();
  }

  // public componentWillReceiveProps(nextProps) {
  //   const navigated = nextProps.location !== this.props.location;
  //   if (navigated) {
  //     const { store } = this.props;
  //     prefetchData(store, this.props.route.routes, nextProps.location.pathname);
  //   }
  // }

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
