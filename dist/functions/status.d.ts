import type { Response } from "../types/interfaces/response.interface.js";
export declare function statusWrapper(res: Response): (code: number) => Response;
