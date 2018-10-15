import * as React from 'react';
import Helmet from 'react-helmet';
import { StyledComponent } from 'atoms/StyledComponent';
import { Icon } from 'atoms/Icon';
import { EIconNames } from 'icons/IconsManifest';
import { connect } from 'react-redux';
import { UserModuleActions } from 'modules/user';

interface IHomePageOwnProps {}
interface IHomePageStateProps {
  count: number;
}
interface IHomePageDispatchersProps {
  increment: () => any;
  decrement: (count?: number) => any;
}
interface IHomePageProps
  extends IHomePageOwnProps,
    IHomePageStateProps,
    IHomePageDispatchersProps {}

export class HomePagePure extends React.Component<IHomePageProps, {}> {
  public render() {
    return (
      <>
        <Helmet>
          <title>Fuck that Title</title>
        </Helmet>
        <StyledComponent underlined onClick={this.handleClick}>
          Fuck that shit {this.props.count} timess
          <Icon name={EIconNames.infinity} />
        </StyledComponent>
      </>
    );
  }

  private handleClick = () => {
    this.props.increment();
    this.props.decrement();
  };
}

export const HomePage = connect<
  IHomePageStateProps,
  IHomePageDispatchersProps,
  IHomePageOwnProps,
  IRootState
>(
  (state) => ({
    count: state.user.count,
  }),
  (dispatch) => ({
    increment: () => dispatch(UserModuleActions.increment()),
    decrement: (count?: number) => dispatch(UserModuleActions.decrement(count)),
  }),
)(HomePagePure);
