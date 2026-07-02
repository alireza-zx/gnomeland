import type { IncomingMessage } from 'node:http';
export interface GnomeRequest extends IncomingMessage {
    body: Record<string, any>;
    rawBody: Buffer;
    query: Record<string, string | boolean>;
    params: Record<string, string>;
    path: string;
    cookies: Record<string, string>;
}
