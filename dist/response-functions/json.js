export function jsonWrapper(res) {
    return function json(data) {
        if (typeof data === 'string') {
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
        }
        const jsonString = JSON.stringify(data);
        res.setHeader('Content-Type', 'application/json');
        res.end(jsonString);
    };
}
