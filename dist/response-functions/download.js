import fs from "node:fs";
import { pipeline } from "node:stream";
import { basename } from "node:path";
export function downloadFileWrapper(res) {
    return async function sendFile(filePath, mimeType) {
        const fileSize = (await fs.promises.stat(filePath)).size;
        const fileName = basename(filePath);
        const readStream = fs.createReadStream(filePath);
        // writing headers
        res.statusCode = 200;
        res.setHeader("content-type", mimeType);
        res.setHeader("content-length", fileSize);
        res.setHeader("content-disposition", `attachment; filename="${fileName}"`);
        // start writing
        if (res.closed)
            return;
        pipeline(readStream, res, (err) => { });
    };
}
