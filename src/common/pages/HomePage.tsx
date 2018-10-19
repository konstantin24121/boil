import * as React from 'react';
import Helmet from 'react-helmet';
import { StyledComponent } from 'atoms/StyledComponent';
import { Icon } from 'atoms/Icon';
import { EIconNames } from 'icons/IconsManifest';
import { connect } from 'react-redux';
import { UserModuleActions } from 'modules/user';
import { Link } from 'react-router-dom';
import { config } from 'common/config';

interface IOwnProps {}
interface IStateProps {
  count: number;
}
interface IDispatchersProps {
  increment: () => any;
  decrement: (count?: number) => any;
}
interface IProps extends IOwnProps, IStateProps, IDispatchersProps {}

export class HomePagePure extends React.Component<IProps, {}> {
  public render() {
    return (
      <>
        <Helmet>
          <title>Fuck that Title</title>
        </Helmet>
        <StyledComponent underlined onClick={this.handleClick}>
          Fuck that shit {this.props.count} timess
          <Link to={config.routes.about}>
            <Icon name={EIconNames.infinity} />
          </Link>
        </StyledComponent>
      </>
    );
  }

  private handleClick = () => {
    this.props.increment();
    this.props.decrement(2);
  };
}

export const HomePage = connect<IStateProps, IDispatchersProps, IOwnProps, IRootState>(
  (state) => ({
    count: state.user.count,
  }),
  (dispatch) => ({
    increment: () => dispatch(UserModuleActions.increment()),
    decrement: (count?: number) => dispatch(UserModuleActions.decrement(count)),
  }),
)(HomePagePure);
