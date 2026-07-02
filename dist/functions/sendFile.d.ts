import type { Request } from "../types/interfaces/request.interface.js";
import type { Response } from "../types/interfaces/response.interface.js";
export declare function sendFileWrapper(req: Request, res: Response): (filePath: string, mimeType: string) => Promise<void>;
