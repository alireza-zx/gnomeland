import { Buffer } from "node:buffer";
export function textWrapper(res) {
    return function text(text, mimeType) {
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
