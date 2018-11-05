import { RouteConfig } from 'react-router-config';
import { App } from './App';
import { config } from './config';
// import { HomePage } from './pages/HomePage';
// import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserModuleActions } from 'modules/user';
import { LoadableComponent } from 'atoms/Loadable';

export interface IRouteConfigWithPrefetch extends RouteConfig {
  prefetch?: (store, match) => Promise<any>;
  routes?: IRouteConfigWithPrefetch[];
}

const AsyncHomePage = LoadableComponent({
  loader: () => import('./pages/HomePage'),
});

const AsyncAboutPage = LoadableComponent({
  loader: () => import('./pages/AboutPage'),
});

export const router: IRouteConfigWithPrefetch[] = [
  {
    component: App,
    routes: [
      {
        path: config.routes.home,
        exact: true,
        component: AsyncHomePage,
        prefetch: ({ dispatch }) => dispatch(UserModuleActions.decrement()),
      },
      { path: config.routes.about, component: AsyncAboutPage },
      { component: NotFoundPage },
    ],
  },
];
