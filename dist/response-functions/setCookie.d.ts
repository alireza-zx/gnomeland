import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { SetCookieOptions } from "../types/interfaces/setCookieOptions.interface.js";
export declare function setCookieWrapper(res: GnomeResponse): (cookieName: string, cookieValue: string, options?: SetCookieOptions) => void;
