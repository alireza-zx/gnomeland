import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";
export declare function cookieParser(): (req: GnomeRequest, res: GnomeResponse, next: any) => any;
