export function securityChecks(req, res, options) {
    if (req.destroyed)
        return false;
    if (Object.keys(req.headers).length > (options.maxHeadersCount ?? 50)) {
        res.writeHead(431, { 'content-type': 'application/json' });
        res.end(`{ "status": "failed", "message": "Too many headers" }`);
        return false;
    }
    if (Buffer.byteLength(JSON.stringify(req.headers), 'utf-8') > (options.maxHeadersSize ?? 10000)) {
        res.writeHead(431, { 'content-type': 'application/json' });
        res.end(`{ "status": "failed", "message": "Headers too large" }`);
        return false;
    }
    return true;
}
