import type { GnomeRequest } from "./interfaces/request.interface.js";
import type { GnomeResponse } from "./interfaces/response.interface.js";
export type ErrorHandler = (err: any, req: GnomeRequest, res: GnomeResponse) => void | Promise<void>;
