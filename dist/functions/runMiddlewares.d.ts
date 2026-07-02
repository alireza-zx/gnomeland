import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { Handler } from "../types/handler.type.js";
import type { ErrorHandler } from "../types/errorHandler.type.js";
export declare function runHandlersAndMiddlewares(req: GnomeRequest, res: GnomeResponse, middlewares: Handler[], index: number, routeHandlers: Handler[], errorHandler: ErrorHandler | undefined): Promise<void>;
