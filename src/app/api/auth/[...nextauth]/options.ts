import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type UserSession = {
  id: number;
  name: string;
  email: string;
  jwt: string;
  picture: string;
  provider: string;
};

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 1,
  },
  providers: [
    CredentialsProvider({
      credentials: {},

      async authorize(credentials) {
        if (credentials == null) return null;

        try {
          const user = credentials as {
            id: number;
            name: string;
            email: string;
            jwt: string;
            picture: string;
            provider: string;
          };

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as UserSession;

      return session;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (trigger === 'update' && session.fullName) {
        token.user.name = session.fullName;
      }

      if (trigger === 'update' && session.picture) {
        token.user.picture = session.picture;
      }

      if (user) {
        token.user = user;
      }

      return token;
    },
  },
};
