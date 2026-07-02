interface ParseBodyOptions {
    /**
     * the maximum size that a request body can have. IN BYTES
     */
    limit: number;
}
export interface gnomeOptions {
    /**
     * if included in options, the request's payload will be automatically parsed in object form in req.body and req.rawBody
     */
    parseBody?: ParseBodyOptions;
    /**
     * if true, the request cookies will be automatically parsed in object form in req.cookie
     */
    parseCookies?: boolean;
}
export {};
