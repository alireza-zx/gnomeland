import { Buffer } from "node:buffer";
import type { GnomeRequest } from "../types/interfaces/request.interface.js";
import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { Next } from "../types/next.type.js";

export const bodyParser = (limit: number) => {
  return async function bodyParser(req: GnomeRequest, res: GnomeResponse, next: Next) {
    const buff = Buffer.alloc(limit);
    let offset = 0;
    req.on("data", (chunk) => {
      const remain = limit - offset;
      const bytesToCopy = Math.min(remain, chunk.length);

      chunk.copy(buff, offset, 0, bytesToCopy);
      offset += bytesToCopy;

      if (offset >= limit) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.end('{ "status": "error", "message": "Request payload too large" }');
        req.destroy();
      }
    });

    req.on("end", () => {
      const data = buff.subarray(0, offset).toString("utf-8");

      try {
        if (req.headers["content-type"] === "application/json")
          req.body = JSON.parse(data);
      } catch(err) {
        
      }

      req.rawBody = buff.subarray(0, offset);
      next();
    });
  };
}