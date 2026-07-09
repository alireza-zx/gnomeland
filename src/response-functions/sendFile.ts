import fs from "node:fs";
import mime from 'mime-types';
import type { GnomeResponse } from "../types/interfaces/response.interface.js";
import type { GnomeRequest } from "../types/interfaces/request.interface.js";

export function sendFileWrapper(req: GnomeRequest, res: GnomeResponse) {
  return async function sendFile(filePath: string) {
    const fileSize = (await fs.promises.stat(filePath)).size;
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    // Reading headers
    const range = req.headers['range'];

    if (range) {
      const parts = range.replace('bytes=', '').split('-');
      const start = Number(parts[0]);
      const end = parts[1] ? Number(parts[1]) : fileSize - 1;
      const contentLength = end - start + 1;

      // Writing headers
      res.writeHead(206, {
        "content-type": mimeType,
        "content-length": contentLength,
        "accept-ranges": 'bytes',
        "content-range": `bytes ${start}-${end}/${fileSize}`
      });

      const readStream = fs.createReadStream(filePath, {
        start,
        end
      });

      if (res.closed) return;

      readStream.pipe(res);
    } else {
      // writing headers
      res.statusCode = 200;
      res.setHeader("content-type", mimeType);
      res.setHeader("content-length", fileSize);
      res.setHeader("content-disposition", "inline");
  
      const readStream = fs.createReadStream(filePath);
      
      // start writing
      if (res.closed) return;
  
      readStream.pipe(res);
    }
  };
}