export async function runHandlersAndMiddlewares(req, res, middlewares, index, handler, url) {
    if (index < middlewares.length) {
        const middleware = middlewares[index];
        await middleware(req, res, () => runHandlersAndMiddlewares(req, res, middlewares, index + 1, handler, url));
    }
    else {
        if (handler)
            await handler(req, res);
        else
            res.status(404).json({
                status: "fail",
                message: `Cannot ${req.method} ${url.pathname}`,
            });
    }
}
