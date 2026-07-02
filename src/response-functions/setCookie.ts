import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { SetCookieOptions } from "../types/interfaces/setCookieOptions.interface.js";

export function setCookieWrapper(res: GnomeResponse) {
  return (cookieName: string, cookieValue: string, options?: SetCookieOptions) => {
    let cookie = `${cookieName}=${cookieValue}; `;

    if (options?.httpOnly)
      cookie += 'HttpOnly; ';
    if (options?.secure)
      cookie += 'Secure; ';
    if (options?.domain)
      cookie += `Domain=${options.domain}; `;
    if (options?.expires)
      cookie += `Expires=${options.expires.toUTCString()}; `;
    if (options?.maxAge)
      cookie += `Max-Age=${options.maxAge}; `;
    if (options?.path)
      cookie += `Path=${options.path}; `;
    if (options?.sameSite)
      cookie += `SameSite=${options.sameSite}`;

    res.setHeader('Set-Cookie', cookie);
  }
}