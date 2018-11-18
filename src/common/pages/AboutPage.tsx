import * as React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router';
import { config } from 'common/config';
import { Link } from 'react-router-dom';
import { RedirectWithStatus } from 'atoms/RedirectWithStatus';
import { Icon } from 'atoms/Icon';
import { EIconNames } from 'icons/IconsManifest';

export class AboutPage extends React.Component<{}, {}> {
  public render() {
    const whatever = undefined;
    return (
      <>
        <Helmet>
          <title>About and fuckit</title>
        </Helmet>
        <div onClick={() => whatever.zad}>about</div>
        <Link to={`${config.routes.about}/zad`}>wrong way</Link>
        <Switch>
          <Route
            exact
            path={config.routes.about}
            render={() => (
              <Link to={config.routes.someBodySneakingAround}>sneaking</Link>
            )}
          />

          <Route
            path={config.routes.someBodySneakingAround}
            exact
            render={() => (
              <>
                <Link to={config.routes.about}>do not sneaking</Link>
                <div>
                  Hey! somebody sneaking around
                  <Icon name={EIconNames.infinity} />
                </div>
              </>
            )}
          />
          <RedirectWithStatus from="" status={404} to={config.routes.home} />
        </Switch>
      </>
    );
  }
}

export default AboutPage;
