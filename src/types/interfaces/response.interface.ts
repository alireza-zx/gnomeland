import type { ServerResponse } from "node:http";
import type { SetCookieOptions } from "./setCookieOptions.interface.js";

export interface GnomeResponse extends ServerResponse {
  query: Record<string, string>;
  params: Record<string, string>;
  /**
   * send a file using streams
   * @param filePath the path of the file you want to send, relative path or absoloute path
   * @param mimeType mimeType of the file you want to send.
   */
  sendFile: (filePath: string, mimeType: string) => Promise<void>;
  /**
   * send a file that client will download, using streams
   * @param filePath the path of the file you want to send, relative path or absoloute path
   * @param mimeType mimeType of the file you want to send.
   */
  download: (filePath: string, mimeType: string) => Promise<void>;
  /**
   * set the status code for response
   * @param code status code
   */
  status: (code: number) => GnomeResponse;
  /**
   * send a json
   * @param data javascript object or json string
   */
  json: (data: object | string) => void;
  /**
   * send a text
   * @param text the text you want to send
   */
  text: (text: string, mimeType?: string) => void;
  /**
   * send a cookie
   * @param cookieName name of the cookie
   * @param cookieValue value of the cookie
   * @param options options of cookie
   */
  setCookie: (cookieName: string, cookieValue: string, options: SetCookieOptions) => void;
}
