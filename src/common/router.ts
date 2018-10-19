import { RouteConfig } from 'react-router-config';
import { App } from './App';
import { config } from './config';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router: RouteConfig[] = [
  {
    component: App,
    routes: [
      { path: config.routes.home, exact: true, component: HomePage },
      { path: config.routes.about, component: AboutPage },
      { component: NotFoundPage },
    ],
  },
];
