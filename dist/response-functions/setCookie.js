export function setCookieWrapper(res) {
    return (cookieName, cookieValue, options) => {
        let cookie = `${cookieName}=${cookieValue}; `;
        if (options?.httpOnly)
            cookie += 'HttpOnly; ';
        if (options?.secure)
            cookie += 'Secure; ';
        if (options?.domain)
            cookie += `Domain=${options.domain}; `;
        if (options?.expires)
            cookie += `Expires=${options.expires.toUTCString()}; `;
        if (options?.maxAge)
            cookie += `Max-Age=${options.maxAge}; `;
        if (options?.path)
            cookie += `Path=${options.path}; `;
        if (options?.sameSite)
            cookie += `SameSite=${options.sameSite}`;
        res.setHeader('Set-Cookie', cookie);
    };
}
