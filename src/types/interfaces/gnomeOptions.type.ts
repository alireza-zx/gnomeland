interface ParseBodyOptions {
  /**
   * the maximum size that a request body can have. IN BYTES
   */
  limit: number;
}

interface fileCallbackReturn {
  fileName: string;
  diskStorage?: string | undefined;
}

interface ParseFileOptions {
  /**
   * the storage of file, if 'memory' is selected, the file will be available in req.file.file
   */
  storage: 'memory' | 'disk';

  callback: (file: object) => fileCallbackReturn | Promise<fileCallbackReturn>;
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