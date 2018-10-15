import { RouteConfig } from 'react-router-config';
import { App } from './App';
import { config } from './config';
import { HomePage } from './pages/HomePage';

export const router: RouteConfig[] = [
  { component: App, routes: [{ path: config.routes.home, exact: true, component: HomePage }] },
];
