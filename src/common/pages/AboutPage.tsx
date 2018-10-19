import * as React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router';
import { config } from 'common/config';
import { Link } from 'react-router-dom';
import { RedirectWithStatus } from 'atoms/RedirectWithStatus';

export class AboutPage extends React.Component<{}, {}> {
  public render() {
    return (
      <>
        <Helmet>
          <title>About and fuckit</title>
        </Helmet>
        <div>about</div>
        <Link to={`${config.routes.about}/zad`}>wrong way</Link>
        <Switch>
          <Route
            exact
            path={config.routes.about}
            render={() => <Link to={config.routes.someBodySneakingAround}>sneaking</Link>}
          />

          <Route
            path={config.routes.someBodySneakingAround}
            exact
            render={() => (
              <>
                <Link to={config.routes.about}>do not sneaking</Link>
                <div>Hey! somebody sneaking around</div>
              </>
            )}
          />
          <RedirectWithStatus from="" status={404} to={config.routes.home} />
        </Switch>
      </>
    );
  }
}
