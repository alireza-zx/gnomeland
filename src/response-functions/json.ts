import type { GnomeResponse } from "../types/interfaces/response.interface.js";

export function jsonWrapper(res: GnomeResponse) {
  return function json(data: object | string) {
    if (typeof data === 'string') {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
      return;
    }
    const jsonString = JSON.stringify(data);
    res.setHeader('Content-Type', 'application/json');

    res.end(jsonString);
  }
}