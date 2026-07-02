import type { GnomeResponse } from "../types/interfaces/response.interface.js";
export declare function statusWrapper(res: GnomeResponse): (code: number) => GnomeResponse;
