import { RouteConfig } from 'react-router-config';
import { App } from './App';
import { config } from './config';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserModuleActions } from 'modules/user';

export interface IRouteConfigWithPrefetch extends RouteConfig {
  prefetch?: (store, match) => Promise<any>;
  routes?: IRouteConfigWithPrefetch[];
}

export const router: IRouteConfigWithPrefetch[] = [
  {
    component: App,
    routes: [
      {
        path: config.routes.home,
        exact: true,
        component: HomePage,
        prefetch: ({ dispatch }) => dispatch(UserModuleActions.decrement()),
      },
      { path: config.routes.about, component: AboutPage },
      { component: NotFoundPage },
    ],
  },
];
