import { matchRoutes, RouteConfig } from 'react-router-config';
import { IRouteConfigWithPrefetch } from 'common/router';

export const prefetchData = (store, routes: IRouteConfigWithPrefetch[], location) => {
  const branch = matchRoutes(routes, location);

  const promises = branch.map(
    ({ route, match }: { route: IRouteConfigWithPrefetch; match: any }) => {
      if (route.prefetch) {
        return route.prefetch(store, match);
      }
    },
  );

  return Promise.all(promises);
};
