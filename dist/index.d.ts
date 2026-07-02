import type { Routes } from "./types/routes.type.js";
import type { Handler } from "./types/handler.type.js";
import type { GnomeRequest } from "./types/interfaces/request.interface.js";
import type { GnomeResponse } from "./types/interfaces/response.interface.js";
import type { ErrorHandler } from "./types/errorHandler.type.js";
import type { gnomeOptions } from "./types/interfaces/gnomeOptions.type.js";
/**
 * Create http applications with Gnome!
 *
 * @example
 * import gnome from 'gnome';
 * const gnomeApp = gnome.craftApp(options);
 */
declare class gnome {
    private server;
    protected routes: Routes;
    protected routePaths: string[];
    protected middlewares: Handler[];
    protected errorHandler: ErrorHandler | undefined;
    /**
     * Create a new gnome app
     * @param options app options
     */
    constructor(options?: gnomeOptions);
    /**
     * Listens on incoming requests on a specific port and hostname
     * @param port port number
     * @param host hostname
     * @param cb callback that will be called after server started
     * @example
     * const PORT = process.env.PORT ?? 3000;
     * const HOST = process.env.HOST ?? 'localhost';
     * gnomeApp.listen(PORT, HOST, () => {
     *   console.log(`Server running on http://${HOST}:${PORT}`);
     * });
     */
    listen(port?: number, host?: string, cb?: () => void): void;
    /**
     * Adds handlers and middlewares to a particular path with GET method
     * @param path path
     * @param handlers handlers and middlewares
     */
    get(path: string, ...handlers: Handler[]): void;
    /**
     * Adds handlers and middlewares to a particular path with POST method
     * @param path path
     * @param handlers handlers and middlewares
     */
    post(path: string, ...handlers: Handler[]): void;
    /**
     * Adds handlers and middlewares to a particular path with PATCH method
     * @param path path
     * @param handlers handlers and middlewares
     */
    patch(path: string, ...handlers: Handler[]): void;
    /**
     * Adds handlers and middlewares to a particular path with PUT method
     * @param path path
     * @param handlers handlers and middlewares
     */
    put(path: string, ...handlers: Handler[]): void;
    /**
     * Adds handlers and middlewares to a particular path with DELETE method
     * @param path path
     * @param handlers handlers and middlewares
     */
    delete(path: string, ...handlers: Handler[]): void;
    /**
     * Adds handlers and middlewares to a particular path with OPTIONS method
     * @param path path
     * @param handlers handlers and middlewares
     */
    options(path: string, ...handlers: Handler[]): void;
    /**
     * Adds handlers and middlewares to a particular path with HEAD method
     * @param path path
     * @param handlers handlers and middlewares
     */
    head(path: string, ...handlers: Handler[]): void;
    /**
     * Adds a new middleware to middleware chain
     * @param middleware middleware
     */
    middleware(middleware: Handler): void;
    /**
     * Creates an error handler that handles errors and exceptions
     * @param errorHandler errorHandler
     */
    error<T>(errorHandler: (err: T, req: GnomeRequest, res: GnomeResponse) => void | Promise<void>): void;
    /**
     * Returns a middleware for parsing bodies
     * @param limit the mazimum size that a request body can have
     * @returns Body parser middleware
     */
    static parseBody(limit?: number): (req: GnomeRequest, res: GnomeResponse, next: any) => Promise<void>;
    static parseCookies(): (req: GnomeRequest, res: GnomeResponse, next: any) => any;
    /**
     * Creates a new gnome app
     * @param options options like parseBody, parseCookie or ...
     * @returns a new gnome app
     */
    static craftApp(options?: gnomeOptions): gnome;
}
export default gnome;
export * from './types/errorHandler.type.js';
export * from "./types/handler.type.js";
export * from "./types/interfaces/request.interface.js";
export * from "./types/interfaces/response.interface.js";
