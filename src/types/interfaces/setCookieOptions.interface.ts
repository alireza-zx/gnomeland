export interface SetCookieOptions {
  secure: boolean;
  expires: Date;
  maxAge: number;
  path: string;
  domain: string;
  httpOnly: boolean;
  sameSite: 'strict' | 'lax' | 'none'
}