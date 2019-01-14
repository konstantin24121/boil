import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { css, Global } from '@emotion/core';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { EOLocale } from 'eo-locale';
import { connect } from 'react-redux';
import { ILocaleModuleState } from 'modules/locale';

interface IOwnProps {}
interface IStateProps
  extends Pick<ILocaleModuleState, 'currentLocale' | 'locales'> {}
interface IProps extends IOwnProps, IStateProps, RouteConfigComponentProps {}

class AppClean extends React.Component<IProps> {
  public render() {
    const { route, currentLocale, locales } = this.props;
    return (
      <ThemeProvider {...{ theme }}>
        <Global styles={globalStyles} />
        <EOLocale.Provider language={currentLocale} locales={locales}>
          {renderRoutes(route.routes)}
        </EOLocale.Provider>
      </ThemeProvider>
    );
  }
}

const globalStyles = css`
  body {
    background: ${theme.bgColor};
    color: ${theme.color};
  }

  a:link,
  a:visited {
    color: ${theme.colorAccented};
  }
`;

export const App = connect<IStateProps, IOwnProps, IRootState>(
  (state: IRootState) => ({
    currentLocale: state.locale.currentLocale,
    locales: state.locale.locales,
  }),
)(AppClean);
