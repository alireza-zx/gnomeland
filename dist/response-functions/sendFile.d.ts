import type { GnomeResponse } from "../types/interfaces/response.interface.js";
export declare function sendFileWrapper(res: GnomeResponse): (filePath: string, mimeType: string) => Promise<void>;
