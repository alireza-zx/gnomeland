import { Buffer } from "node:buffer";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";

export function textWrapper(res: GnomeResponse) {
  return function text(text: string, mimeType?: string) {
    const size = Buffer.byteLength(text, 'utf-8');
    const type = mimeType ? mimeType : 'text/txt';
    // writing headers

    res.statusCode = 200;
    res.setHeader("content-type", type);
    res.setHeader("content-length", size);
    res.setHeader("content-disposition", "inline");

    // start writing
    res.end(Buffer.from(text, 'utf-8'));
  };
}