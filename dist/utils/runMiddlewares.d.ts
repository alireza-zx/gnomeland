import type { Middleware } from "../types/middleware.type.js";
import type { Request } from "../types/interfaces/request.interface.js";
import type { Response } from "../types/interfaces/response.interface.js";
import type { Handler } from "../types/handler.type.js";
export declare function runHandlersAndMiddlewares(req: Request, res: Response, middlewares: Middleware[], index: number, handler: Handler | undefined, url: URL): Promise<void>;
