import fs from "node:fs";
import { pipeline } from "node:stream";
import { basename } from "node:path";
export function downloadFileWrapper(req, res) {
    return async function sendFile(filePath, mimeType) {
        const fileHandle = await fs.promises.open(filePath, "r");
        const fileSize = (await fileHandle.stat()).size;
        const fileName = basename(filePath);
        const readStream = fileHandle.createReadStream();
        // writing headers
        res.setHeader("content-type", mimeType);
        res.setHeader("content-length", fileSize);
        res.setHeader("content-disposition", `attachment; filename="${fileName}"`);
        // start writing
        pipeline(readStream, res, async (err, val) => {
            if (err) {
                await fileHandle.close();
                throw err;
            }
        });
    };
}
