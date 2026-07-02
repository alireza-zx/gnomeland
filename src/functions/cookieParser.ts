import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";

export function cookieParser() {
  return (req: GnomeRequest, res: GnomeResponse, next: any) => {
    const cookieString = req.headers.cookie;

    req.cookies = {};
    
    if (!cookieString) {
      return next();
    }

    const cookiesArr = cookieString.split('; ');
    for (let i = 0; i < cookiesArr.length; i++) {
      const cookie = cookiesArr[i]!.split('=');
      const key = cookie[0] ?? `${i}`;
      req.cookies[key] = cookie[1] ?? `${i}`;
    }

    next();
  }
}