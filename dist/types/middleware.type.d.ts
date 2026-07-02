import type { Request } from "./interfaces/request.interface.js";
import type { Response } from "./interfaces/response.interface.js";
export type Middleware = (req: Request, res: Response, next: (err?: Error | any) => void) => void | Promise<void>;
