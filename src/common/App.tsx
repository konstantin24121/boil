import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { injectGlobal } from 'react-emotion';
import { EOLocale } from 'eo-locale';
import { connect } from 'react-redux';
import { ILocaleModuleState } from 'modules/locale';

interface IOwnProps {}
interface IStateProps
  extends Pick<ILocaleModuleState, 'currentLocale' | 'locales'> {}
interface IProps extends IOwnProps, IStateProps, RouteConfigComponentProps {}

class AppClean extends React.Component<IProps> {
  public constructor(props) {
    super(props);
    applyGlobalStyles();
  }

  public render() {
    const { route, currentLocale, locales } = this.props;
    return (
      <ThemeProvider {...{ theme }}>
        <EOLocale.Provider language={currentLocale} locales={locales}>
          {renderRoutes(route.routes)}
        </EOLocale.Provider>
      </ThemeProvider>
    );
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

export const App = connect<IStateProps, IOwnProps, IRootState>(
  (state: IRootState) => ({
    currentLocale: state.locale.currentLocale,
    locales: state.locale.locales,
  }),
)(AppClean);
