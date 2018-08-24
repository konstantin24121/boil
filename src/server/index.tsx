import * as express from 'express';
import * as http from 'http';
import * as PrettyError from 'pretty-error';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { extractCritical } from 'emotion-server';
import Html from './components/Html';
import { App } from '@common/App';

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

    const content = renderToString(<App />);
    const emotionsStyles = extractCritical(content);

    res.send(`<!doctype html>\n
      ${renderToString(
        <Html
          assets={assets}
          content={content}
          css={emotionsStyles.css}
          emotionIds={emotionsStyles.ids}
        />,
      )}`);
  });

  http.createServer(server).listen(global.boil.port, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.info(`Ssr server started at port ${global.boil.port}.`);
  });
}
