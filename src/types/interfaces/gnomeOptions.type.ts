import type { SecurityOptions } from "./securityOptions.interface.js";

export interface gnomeOptions extends SecurityOptions {
  /**
   * if included in options, the request's payload will be automatically parsed in object form in req.body and req.rawBody
   */
  parseBody?: boolean;
  /**
   * if true, the request cookies will be automatically parsed in object form in req.cookie
   */
  parseCookies?: boolean;
}