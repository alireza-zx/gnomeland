import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { Handler } from "../types/handler.type.js";
import type { ErrorHandler } from "../types/errorHandler.type.js";

export async function runHandlers(
  req: GnomeRequest,
  res: GnomeResponse,
  handlers: Handler[],
  index: number,
  errorHandler: ErrorHandler | undefined
) {
  if (index < handlers.length) {
    await handlers[index]!(req, res, async (err?: Error | any) => {
      if (err) {
        if (errorHandler) return await errorHandler(err, req, res);
      }
      runHandlers(req, res, handlers, index + 1, errorHandler);
    });
  }
}

export async function runMiddlewares(
  req: GnomeRequest,
  res: GnomeResponse,
  middlewares: Handler[],
  index: number,
  errorHandler: ErrorHandler | undefined
) {
  if (index < middlewares.length) {
    const middleware = middlewares[index];

    await middleware!(req, res, async (err?: Error | any) => {
      if (err) {
        if (errorHandler) return await errorHandler(err, req, res);
      }
      runMiddlewares(req, res, middlewares, index + 1, errorHandler);
    });
  }
}