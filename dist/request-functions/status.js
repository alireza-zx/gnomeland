export function statusWrapper(res) {
    return function status(code) {
        res.statusCode = code;
        return res;
    };
}
