import * as React from 'react';

import { ThemeProvider } from 'emotion-theming';
import theme from './theme';
import { StyledComponent } from '@atoms/StyledComponent';

export class App extends React.Component<{}> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <StyledComponent underlined>Fuck that shit</StyledComponent>
        </>
      </ThemeProvider>
    );
  }
}
