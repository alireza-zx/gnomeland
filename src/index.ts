import http from "node:http";
import type { Routes } from "./types/routes.type.js";
import type { Handler } from "./types/handler.type.js";
import type { GnomeRequest } from "./types/interfaces/request.interface.js";
import type { GnomeResponse } from "./types/interfaces/response.interface.js";
import { sendFileWrapper } from "./response-functions/sendFile.js";
import { downloadFileWrapper } from "./response-functions/download.js";
import { statusWrapper } from "./response-functions/status.js";
import { jsonWrapper } from "./response-functions/json.js";
import { runHandlers, runMiddlewares } from "./functions/run.js";
import { bodyParser } from "./functions/bodyParser.js";
import type { ErrorHandler } from "./types/errorHandler.type.js";
import { textWrapper } from "./response-functions/text.js";
import { matchRoutes } from "./functions/matchRoutes.js";
import type { gnomeOptions } from "./types/interfaces/gnomeOptions.type.js";
import { cookieParser } from "./functions/cookieParser.js";
import { setCookieWrapper } from "./response-functions/setCookie.js";
import { securityChecks } from "./functions/securityChecks.js";

/**
 * Create http applications with Gnome!
 * 
 * @example
 * import gnome from 'gnome';
 * const gnomeApp = gnome.craftApp(options);
 */
class gnome {
  private server: http.Server;
  protected routes: Routes;
  protected routePaths: string[];
  protected middlewares: Handler[];
  protected errorHandler: ErrorHandler | undefined;

  /**
   * Create a new gnome app
   * @param options app options
   */
  constructor(protected readonly gnomeOptions: gnomeOptions) {
    this.server = http.createServer();
    this.routes = {};
    this.routePaths = [];
    this.middlewares = [];
    this.errorHandler = undefined;

    // Set middlewares for every option
    if (gnomeOptions.parseBody)
      this.middlewares.push(gnome.parseBody(gnomeOptions.maxBodySize));

    if (gnomeOptions.parseCookies)
      this.middlewares.push(gnome.parseCookies());
  }

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
  public listen(port?: number, host?: string, cb?: () => void) {
    this.server.on("request", async (req: GnomeRequest, res: GnomeResponse) => {
      // Checking the request
      if (!securityChecks(req, res, this.gnomeOptions)) return;
      
      const splited = req.url!.split('?');
      const path = splited[0]!;

      // -- Parsing query parameters
      if (splited[1] !== undefined) {
        req.query = Object.fromEntries(splited[1].split('&').reduce((arr, val) => {
          const split = val.split('=');

          if (split[1])
            arr.push([split[0]!, split[1]]);
          else
            arr.push([split[0]!, true]);

          return arr;
        }, [] as [string, string | boolean][]));
      }

      // --- adding additional properties to req object ---
      req.params = {};
      req.path = path;

      // -- adding additional properties to res object --
      res.sendFile = sendFileWrapper(res);
      res.download = downloadFileWrapper(res);
      res.status = statusWrapper(res);
      res.json = jsonWrapper(res);
      res.text = textWrapper(res);
      res.setCookie = setCookieWrapper(res);

      // --- running global middlewares ---

      await runMiddlewares(req, res, this.middlewares, 0, this.errorHandler);

      // --- check if route exists before matching
      if (this.routes[`${req.method} ${req.path}`]) {
        await runHandlers(req, res, this.routes[`${req.method} ${req.path}`]!, 0, this.errorHandler);
        return;
      }

      // -- Matching routes, also will set the parameters in req.params
      const handlers = matchRoutes(path, this.routePaths, this.routes, req);
      
      if (!handlers) {
        return res.status(404).json({
          status: 'failed',
          message: `Cannot ${req.method} ${req.path}`
        });
      }

      // --- running the handlers ---
      await runHandlers(req, res, handlers, 0, this.errorHandler);
    });

    this.server.listen(port, host, cb);
  }

  // ----------------------------------------------------

  /**
   * Adds handlers and middlewares to a particular path with GET method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public get(path: string, ...handlers: Handler[]) {
    if (!this.routes[`GET ${path}`])
      this.routes[`GET ${path}`] = [];

    this.routes[`GET ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`GET ${path}`))
      this.routePaths.push(`GET ${path}`);
  }

  /**
   * Adds handlers and middlewares to a particular path with POST method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public post(path: string, ...handlers: Handler[]) {
    if (!this.routes[`POST ${path}`])
      this.routes[`POST ${path}`] = [];

    this.routes[`POST ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`POST ${path}`))
      this.routePaths.push(`POST ${path}`);
  }

  /**
   * Adds handlers and middlewares to a particular path with PATCH method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public patch(path: string, ...handlers: Handler[]) {
    if (!this.routes[`PATCH ${path}`])
      this.routes[`PATCH ${path}`] = [];

    this.routes[`PATCH ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`PATCH ${path}`))
      this.routePaths.push(`PATCH ${path}`);
  }

  /**
   * Adds handlers and middlewares to a particular path with PUT method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public put(path: string, ...handlers: Handler[]) {
    if (!this.routes[`PUT ${path}`])
      this.routes[`PUT ${path}`] = [];

    this.routes[`PUT ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`PUT ${path}`))
      this.routePaths.push(`PUT ${path}`);
  }

  /**
   * Adds handlers and middlewares to a particular path with DELETE method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public delete(path: string, ...handlers: Handler[]) {
    if (!this.routes[`DELETE ${path}`])
      this.routes[`DELETE ${path}`] = [];

    this.routes[`DELETE ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`DELETE ${path}`))
      this.routePaths.push(`DELETE ${path}`);
  }

  /**
   * Adds handlers and middlewares to a particular path with OPTIONS method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public options(path: string, ...handlers: Handler[]) {
    if (!this.routes[`OPTIONS ${path}`])
      this.routes[`OPTIONS ${path}`] = [];

    this.routes[`OPTIONS ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`OPTIONS ${path}`))
      this.routePaths.push(`OPTIONS ${path}`);
  }

  /**
   * Adds handlers and middlewares to a particular path with HEAD method
   * @param path path
   * @param handlers handlers and middlewares
   */
  public head(path: string, ...handlers: Handler[]) {
    if (!this.routes[`HEAD ${path}`])
      this.routes[`HEAD ${path}`] = [];

    this.routes[`HEAD ${path}`]!.push(...handlers)

    if (!this.routePaths.includes(`HEAD ${path}`))
      this.routePaths.push(`HEAD ${path}`);
  }

  // ------------------------------------------------------

  /**
   * Adds a new middleware to middleware chain
   * @param middleware middleware
   */
  public middleware(middleware: Handler) {
    this.middlewares.push(middleware);
  }

  /**
   * Creates an error handler that handles errors and exceptions
   * @param errorHandler errorHandler
   */
  public error<T>(errorHandler: (err: T, req: GnomeRequest, res: GnomeResponse) => void | Promise<void>) {
    this.errorHandler = errorHandler;
  }

  /**
   * Returns a middleware for parsing bodies
   * @param limit the mazimum size that a request body can have
   * @returns Body parser middleware
   */
  static parseBody(limit: number = 10000) {
    return bodyParser(limit);
  }

  static parseCookies() {
    return cookieParser();
  }

  /**
   * Creates a new gnome app
   * @param options options like parseBody, parseCookie or ...
   * @returns a new gnome app
   */
  static craftApp(options?: gnomeOptions) {
    const gnomeOptions: Record<string, any> = {};

    if (options?.parseBody)
      gnomeOptions.parseBody = options.parseBody;
    if (options?.maxBodySize)
      gnomeOptions.maxBodySize = options.maxBodySize;
    if (options?.maxHeadersCount)
      gnomeOptions.maxHeadersCount = options.maxHeadersCount;
    if (options?.maxHeadersSize)
      gnomeOptions.maxHeadersSize = options.maxHeadersSize;
    if (options?.parseCookies)
      gnomeOptions.parseCookies = options.parseCookies;

    return new gnome(gnomeOptions);
  }
}

export default gnome;

export * from './types/errorHandler.type.js';
export * from "./types/handler.type.js";
export * from "./types/interfaces/request.interface.js";
export * from "./types/interfaces/response.interface.js";