import * as express from 'express';
import * as http from 'http';
import * as PrettyError from 'pretty-error';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
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
import * as cookieParser from 'cookie-parser';

const pe = new PrettyError();

pe.start();
// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function(parameters) {
  const server: express.Application = express();
  server.use(cookieParser.default());

  server.get('/server.js', (req, res) => {
    res.writeHead(404);
    res.end();
  });

  // serve our static stuff like index.css
  server.use(express.static(global.boil.dist, { index: false }));

  // send all requests to index.html so browserHistory works
  server.get('*', cache(), (req, res) => {
    const assets = parameters.chunks();
    const clientLanguages = getClientLanguage(req);
    const context: StaticRouterContext = {};

    loadLocales(clientLanguages).then((locales) => {
      const store = configureStore({
        user: { count: 50 },
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
          <Root {...{ store, context, url: req.url }} />,
        );
        const emotionsStyles = extractCritical(content);
        const helmet = Helmet.renderStatic();

        errorHandle(context, res);
        res.send(`<!doctype html>\n
        ${renderToString(
          <Html
            {...{ store, helmet, assets, content }}
            css={emotionsStyles.css}
            emotionIds={emotionsStyles.ids}
          />,
        )}`);
      });
    });
  });

  http
    .createServer(server)
    .listen(global.boil.port, global.boil.host, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.info(
        `Ssr server started at \x1b[36mhttp://${global.boil.host}:${
          global.boil.port
        }\x1b[0m.`,
      );

      if (global.boil.isDevelopment) {
        console.log(`🔥🔥🔥 Tip 🔥🔥🔥
You can use it for debuggins on all devices at your network 📱`);
      }

      if (global.boil.hostname && global.boil.isDevelopment) {
        console.info(
          `For better expirience on current device you can use \x1b[36mhttp://${
            global.boil.hostname
          }:${global.boil.port} instead\x1b[0m.`,
        );
      }
    });
}
