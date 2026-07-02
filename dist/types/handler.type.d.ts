import type { GnomeRequest } from "./interfaces/request.interface.js";
import type { GnomeResponse } from "./interfaces/response.interface.js";
/**
 * @param request the request object
 * @param response the response object
 * @param next calls the next middleware or handler
 * if you call next() with an argument, the request will go straight to the error handler
 */
export type Handler = (request: GnomeRequest, response: GnomeResponse, next?: (err?: Error | any) => void) => void | Promise<void>;
