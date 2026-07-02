import type { GnomeResponse } from "../types/interfaces/response.interface.js";
export declare function downloadFileWrapper(res: GnomeResponse): (filePath: string, mimeType: string) => Promise<void>;
