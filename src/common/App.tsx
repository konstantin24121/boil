import * as React from 'react';
import { connect } from 'react-redux';

import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { UserModule } from 'modules/user';
import { StyledComponent } from 'atoms/StyledComponent';
import { Icon } from 'atoms/Icon';
import { EIconNames } from 'icons/IconsManifest';

export namespace IApp {
  export interface IOwnProps {}
  export interface IStateProps {
    count: number;
  }
  export interface IDispatchersProps {
    increment: () => any;
    decrement: (count?: number) => any;
  }
  export interface IProps
    extends IApp.IOwnProps,
      IApp.IStateProps,
      IDispatchersProps {}
}

class AppPure extends React.Component<IApp.IProps> {
  public render() {
    return <ThemeProvider {...{ theme }}>
        <>
          <StyledComponent underlined onClick={this.handleClick}>
            Fuck that shit {this.props.count} times
            <Icon name={EIconNames.infinity} />

          </StyledComponent>
        </>
      </ThemeProvider>;
  }

  private handleClick = () => {
    this.props.increment();
    this.props.decrement(1);
  };
}

const App = connect<
  IApp.IStateProps,
  IApp.IDispatchersProps,
  IApp.IOwnProps,
  IRootState
>(
  (state) => ({
    count: state.user.count,
  }),
  (dispatch) => ({
    increment: () => dispatch(UserModule.Actions.increment()),
    decrement: (count?: number) =>
      dispatch(UserModule.Actions.decrement(count)),
  }),
)(AppPure);

export { App };
