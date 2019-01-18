import * as React from 'react';
import Helmet from 'react-helmet';
import { StyledComponent } from 'atoms/StyledComponent';
import { Icon } from 'atoms/Icon';
import { EIconNames } from 'icons/IconsManifest';
import { connect } from 'react-redux';
import {
  UserModuleActions,
  TUserModuleActions,
  IUserModuleState,
} from 'modules/user';
import { Link } from 'react-router-dom';
import { config } from 'common/config';
import { EOLocale } from 'eo-locale';
import { IWithLocaleProps } from 'eo-locale/dist/withLocale';
import { LocaleModuleActions, TLocaleModuleActions } from 'modules/locale';
import { EAvaliableLanguages } from 'static/locales/types';

interface IOwnProps {}
interface IStateProps extends Pick<IUserModuleState, 'count'> {}
interface IDispatchersProps
  extends Pick<TUserModuleActions, 'increment' | 'decrement' | 'fetchUser'>,
    Pick<TLocaleModuleActions, 'changeCurrentLocale'> {}
interface IProps
  extends IOwnProps,
    IStateProps,
    IDispatchersProps,
    IWithLocaleProps {}

export class HomePagePure extends React.Component<IProps, {}> {
  public componentDidMount() {
    this.props.fetchUser('konstantin24121');
  }
  public render() {
    return (
      <>
        <Helmet>
          <title>{this.props.formatMessage('PAGETITLE.FUCK')}</title>
        </Helmet>
        <StyledComponent underlined>
          <button onClick={() => this.props.increment()}>inc</button>
          <button onClick={() => this.props.decrement(2)}>dec</button>
          <EOLocale.Text id="COMMON.FUCK_THAT" count={this.props.count} />
          <Link to={config.routes.about}>
            <Icon name={EIconNames.infinity} />
          </Link>
        </StyledComponent>
        <button
          onClick={() => {
            this.props.changeCurrentLocale(
              this.props.language === EAvaliableLanguages.EN
                ? EAvaliableLanguages.RU
                : EAvaliableLanguages.EN,
            );
          }}
        >
          Change language
        </button>
      </>
    );
  }
}

export const HomePage = connect<
  IStateProps,
  IDispatchersProps,
  IOwnProps,
  IRootState
>(
  (state) => ({ count: state.user.count }),
  (dispatch) => ({
    increment: () => dispatch(UserModuleActions.increment()),
    decrement: (count) => dispatch(UserModuleActions.decrement(count)),
    fetchUser: (login) => dispatch(UserModuleActions.fetchUser(login)),
    changeCurrentLocale: (locale) =>
      dispatch(LocaleModuleActions.changeCurrentLocale(locale)),
  }),
)(EOLocale.withLocale(HomePagePure));

export default HomePage;
