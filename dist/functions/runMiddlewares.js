export async function runHandlersAndMiddlewares(req, res, middlewares, index, routeHandlers, errorHandler) {
    if (index < middlewares.length) {
        const middleware = middlewares[index];
        await middleware(req, res, async (err) => {
            if (err) {
                if (errorHandler)
                    return await errorHandler(err, req, res);
            }
            runHandlersAndMiddlewares(req, res, middlewares, index + 1, routeHandlers, errorHandler);
        });
    }
    else {
        // global middlewares are done, now the route handlers
        async function runHandlers(req, res, handlers, index) {
            if (index < handlers.length) {
                const handler = handlers[index];
                await handler(req, res, async (err) => {
                    if (err) {
                        if (errorHandler)
                            return await errorHandler(err, req, res);
                    }
                    runHandlers(req, res, handlers, index + 1);
                });
            }
        }
        runHandlers(req, res, routeHandlers, 0);
    }
}
