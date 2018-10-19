import { StaticRouterContext } from 'react-router';
import { Response } from 'express';

export function errorHandle(context: StaticRouterContext, res: Response) {
  if ('url' in context || 'statusCode' in context) {
    if (context.statusCode) {
      if (context.statusCode === 301) {
        res.writeHead(context.statusCode, { Location: context.url });
        res.end();
      }
      res.status(context.statusCode);
    }
  }
}
