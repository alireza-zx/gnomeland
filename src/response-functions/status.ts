import type { GnomeResponse } from "../types/interfaces/response.interface.js";

export function statusWrapper(res: GnomeResponse) {
  return function status(code: number) {
    res.statusCode = code;
    return res;
  }
}