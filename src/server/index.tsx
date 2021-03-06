import '@babel/polyfill';
import * as express from 'express';
import * as http from 'http';
import * as fs from 'fs';
import * as https from 'https';
import * as PrettyError from 'pretty-error';
import * as React from 'react';
import * as path from 'path';
import { renderToString } from 'react-dom/server';
import Html from './components/Html';
import { configureStore } from 'common/reduck/store';
import { Root } from './Root';
import { router } from 'common/router';
import Helmet from 'react-helmet';
import { StaticRouterContext } from 'react-router';
import { errorHandle } from './utils/errorHandler';
import { prefetchData } from 'utils/prefetchData';
import { loadLocales, getClientLanguage } from './utils/loadLocales';
import { cache } from './utils/cache';
import { localeReducerInitialState } from 'modules/locale/reducer';
import { userReducerInitialState } from 'modules/user/reducer';
import * as cookieParser from 'cookie-parser';
import * as Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

// tslint:disable-next-line:no-var-requires
const preloadStatsfrom = require('./react-loadable.json');

const pe = new PrettyError();

pe.start();
// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function(parameters) {
  const server: express.Application = express();
  server.use(cookieParser());

  server.get('/server.js', (req, res) => {
    res.writeHead(404);
    res.end();
  });

  // serve our static stuff like index.css
  server.use(express.static(global.boil.dist, { index: false }));

  // Simple api
  server.post('/api/user/:id', (req, res) => {
    res.json({
      login: req.params.id,
      id: 9361325,
      avatar_url: 'https://avatars3.githubusercontent.com/u/9361325?v=4',
    });
  })

  // send all requests to index.html so browserHistory works
  server.get('*', cache(), (req, res) => {
    const assets = parameters.chunks();
    const clientLanguages = getClientLanguage(req);
    const context: StaticRouterContext = {};
    const modules = [];

    loadLocales(clientLanguages).then((locales) => {
      const store = configureStore({
        user: { ...userReducerInitialState, count: 50 },
        locale: {
          ...localeReducerInitialState,
          currentLocale:
            clientLanguages.length !== 0
              ? clientLanguages[0]
              : localeReducerInitialState.currentLocale,
          locales,
        },
      });

      prefetchData(store, router, req.url).then(() => {
        const content = renderToString(
          <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
            <Root {...{ store, context, url: req.url }} />
          </Loadable.Capture>,
        );
        const helmet = Helmet.renderStatic();
        const preloaded: any[] = getBundles(preloadStatsfrom, modules);
        errorHandle(context, res);
        res.send(`<!doctype html>\n
        ${renderToString(
          <Html {...{ store, helmet, assets, content, preloaded }} />,
        )}`);
      });
    });
  });
  let hServer;
  if (global.boil.https) {
    const options = {
      hostname: 'demo.local',
      key: fs.readFileSync('cert/server.key'),
      cert: fs.readFileSync('cert/server.crt'),
      requestCert: false,
      rejectUnauthorized: false,
    };
    hServer = https.createServer(options, server);
  } else {
    hServer = http.createServer(server);
  }

  Loadable.preloadAll()
    .then(() => {
      hServer.listen(global.boil.port, global.boil.host, (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.info(
          `Ssr server started at \x1b[36mhttp${
            global.boil.https ? 's' : ''
          }://${global.boil.host}:${global.boil.port}\x1b[0m.`,
        );

        if (global.boil.isDevelopment) {
          console.log(`🔥🔥🔥 Tip 🔥🔥🔥
You can use it for debuggins on all devices at your network 📱`);
        }

        if (global.boil.hostname && global.boil.isDevelopment) {
          console.info(
            `For better expirience on current device you can use \x1b[36mhttp${
              global.boil.https ? 's' : ''
            }://${global.boil.hostname}:${global.boil.port} instead\x1b[0m.`,
          );
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
