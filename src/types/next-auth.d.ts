/* eslint-disable no-unused-vars */
import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      id: number;
      name: string;
      email: string;
      jwt: string;
      picture: string;
      provider: string;
    };
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number;
    jwt: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    picture?: string | null;
    user: {
      name?: string | null;
      picture?: string | null;
    };
  }
}
