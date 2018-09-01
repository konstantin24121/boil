import * as React from 'react';
import { connect } from 'react-redux';


import { ThemeProvider } from 'emotion-theming';
import { theme } from './theme';
import { UserModuleActions } from 'modules/user';
import { StyledComponent } from 'atoms/StyledComponent';
import { Icon } from 'atoms/Icon';
import { EIconNames } from 'icons/IconsManifest';

export interface IAppOwnProps {}
export interface IAppStateProps {
  count: number;
}
export interface IAppDispatchersProps {
  increment: () => any;
  decrement: (count?: number) => any;
}
export interface IAppProps
  extends IAppOwnProps,
    IAppStateProps,
  IAppDispatchersProps {}

class AppPure extends React.Component<IAppProps> {
  public render() {
    return <ThemeProvider {...{ theme }}>
        <>
          <StyledComponent underlined onClick={this.handleClick}>
            Fuck that shit {this.props.count} timess
            <Icon name={EIconNames.infinity} />

          </StyledComponent>
        </>
      </ThemeProvider>;
  }

  private handleClick = () => {
    this.props.increment();
    this.props.decrement();
  };
}

const App = connect<
  IAppStateProps,
  IAppDispatchersProps,
  IAppOwnProps,
  IRootState
>(
  (state) => ({
    count: state.user.count,
  }),
  (dispatch) => ({
    increment: () => dispatch(UserModuleActions.increment()),
    decrement: (count?: number) =>
      dispatch(UserModuleActions.decrement(count)),
  }),
)(AppPure);

export { App };
