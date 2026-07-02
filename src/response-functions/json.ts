import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import { Buffer } from "node:buffer";

export function jsonWrapper(res: GnomeResponse) {
  return function json(data: object | string) {
    if (typeof data === 'string') {
      res.setHeader('Content-Type', 'application/json');
      res.end(Buffer.from(data, 'utf-8'));
      return;
    }
    const jsonString = JSON.stringify(data);
    res.setHeader('Content-Type', 'application/json');

    res.end(Buffer.from(jsonString, 'utf-8'));
  }
}