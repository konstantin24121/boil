import * as express from 'express';
import * as http from 'http';
import * as PrettyError from 'pretty-error';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import Html from './components/Html';
import { configureStore } from 'common/reduck/store';
import { Root } from './Root';
import Helmet from 'react-helmet';
import { StaticContext, StaticRouterContext } from 'react-router';
import { errorHandle } from './utils/errorHandler';

const pe = new PrettyError();

pe.start();
// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function(parameters) {
  const server: express.Application = express();
  // serve our static stuff like index.css
  server.use(express.static(global.boil.dist, { index: false }));

  // send all requests to index.html so browserHistory works
  server.get('*', (req, res) => {
    const assets = parameters.chunks();

    const context: StaticRouterContext = {};
    const store = configureStore({ user: { count: 50 } });
    const content = renderToString(<Root {...{ store, context, url: req.url }} />);
    const emotionsStyles = extractCritical(content);
    const helmet = Helmet.renderStatic();

    errorHandle(context, res);

    res.send(`<!doctype html>\n
      ${renderToString(
        <Html
          {...{
            store,
            helmet,
            assets,
            content,
          }}
          css={emotionsStyles.css}
          emotionIds={emotionsStyles.ids}
        />,
      )}`);
  });

  http.createServer(server).listen(global.boil.port, global.boil.host, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.info(`Ssr server started at http://${global.boil.host}:${global.boil.port}.`);
  });
}
