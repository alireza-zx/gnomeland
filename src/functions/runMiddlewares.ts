import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { Handler } from "../types/handler.type.js";
import type { ErrorHandler } from "../types/errorHandler.type.js";


export async function runHandlersAndMiddlewares(
  req: GnomeRequest,
  res: GnomeResponse,
  middlewares: Handler[],
  index: number,
  routeHandlers: Handler[],
  errorHandler: ErrorHandler | undefined,
) {
  if (index < middlewares.length) {
    const middleware = middlewares[index];

    await middleware!(req, res, async (err?: Error | any) => {
      if (err) {
        if (errorHandler)
          return await errorHandler(err, req, res);
      }
      runHandlersAndMiddlewares(req, res, middlewares, index + 1, routeHandlers, errorHandler);
    });
  } else {
    // global middlewares are done, now the route handlers

    async function runHandlers(req: GnomeRequest, res: GnomeResponse, handlers: Handler[], index: number) {
      if (index < handlers.length) {
        const handler = handlers[index];

        await handler!(req, res, async (err?: Error | any) => {
          if (err) {
            if (errorHandler)
              return await errorHandler(err, req, res);
          }
          runHandlers(req, res, handlers, index + 1);
        });
      }
    }
    
    runHandlers(req, res, routeHandlers, 0);
  }
}