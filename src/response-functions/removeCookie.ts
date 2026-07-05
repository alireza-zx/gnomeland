import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { SetCookieOptions } from "../types/interfaces/setCookieOptions.interface.js";
import { setCookieWrapper } from "./setCookie.js";

export function removeCookieWrapper(res: GnomeResponse) {
  return function removeCookie(cookieName: string, options: SetCookieOptions = { path: '/' }) {
    setCookieWrapper(res)(cookieName, "", {
      ...options,
      maxAge: 0,
      expires: new Date(1)
    });
  }
}