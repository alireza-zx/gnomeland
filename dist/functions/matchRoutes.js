export function matchRoutes(requestPath, routes, routesObject, req) {
    const requestPathParts = requestPath.split('/');
    if (requestPathParts[0] === '')
        requestPathParts.shift();
    if (requestPathParts[requestPathParts.length - 1] === '')
        requestPathParts.pop();
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const parts = route.split('/');
        if (parts[parts.length - 1] === '')
            parts.pop();
        parts.shift();
        if (parts.length !== requestPathParts.length)
            continue;
        let j = parts.length;
        const paramsIndexes = [];
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].startsWith(':')) {
                --j;
                const copyi = i;
                paramsIndexes.push(copyi);
                continue;
            }
            if (parts[i] === requestPathParts[i])
                --j;
        }
        if (j === 0) {
            for (let i = 0; i < paramsIndexes.length; i++) {
                const key = parts[paramsIndexes[i]]?.slice(1) || paramsIndexes[i];
                req.params[key] = requestPathParts[paramsIndexes[i]] || '';
            }
            return routesObject[route];
        }
    }
}
