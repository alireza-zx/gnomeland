import type { Handler } from "../types/handler.type.js";
import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { Routes } from "../types/routes.type.js";
export declare function matchRoutes(requestPath: string, routes: string[], routesObject: Routes, req: GnomeRequest): Handler[] | undefined;
