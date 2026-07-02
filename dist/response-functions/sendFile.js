import fs from "node:fs";
import { pipeline } from "node:stream";
export function sendFileWrapper(res) {
    return async function sendFile(filePath, mimeType) {
        const fileSize = (await fs.promises.stat(filePath)).size;
        const readStream = fs.createReadStream(filePath);
        // writing headers
        res.statusCode = 200;
        res.setHeader("content-type", mimeType);
        res.setHeader("content-length", fileSize);
        res.setHeader("content-disposition", "inline");
        // start writing
        if (res.closed)
            return;
        pipeline(readStream, res, (err) => { });
    };
}
