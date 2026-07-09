import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { GnomeRequest } from "../types/interfaces/request.interface.js";
export declare function downloadFileWrapper(req: GnomeRequest, res: GnomeResponse): (filePath: string) => Promise<void>;
