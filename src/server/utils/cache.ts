import { NextFunction, Request, Response } from 'express';
import * as mcache from 'memory-cache';

interface IResponseWithExtraParams extends Response {
  sendResponse: (body: any) => Response;
}

export function cache() {
  return (req: Request, res: IResponseWithExtraParams, next: NextFunction) => {
    const bodyKey = `__express__${req.originalUrl || req.url}`;
    const statusKey = `__express_status__${req.originalUrl || req.url}`;
    const cachedBody = mcache.get(bodyKey);

    if (cachedBody) {
      res.status(mcache.get(statusKey) || 200).send(cachedBody);
    } else {
      if (mcache.size() > global.boil.cacheLimit) {
        mcache.clear();
      }

      res.sendResponse = res.send;

      res.send = (body) => {
        mcache.put(bodyKey, body, global.boil.cacheLifeTime);
        mcache.put(statusKey, res.statusCode, global.boil.cacheLifeTime);
        return res.sendResponse(body);
      };

      next();
    }
  };
}
