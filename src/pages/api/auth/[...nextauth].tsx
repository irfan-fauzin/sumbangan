// @ts-nocheck
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { compare } from 'bcrypt';
import prisma from '@/lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: 'username', type: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};
        if (!username || !password) {
          throw new Error('Missing username or password');
        }

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        // if user doesn't exist or password doesn't match
        if (!user || password !== user.password) {
          throw new Error('Invalid username or password');
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
    signOut: '/logout',
  },

  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.verified = token.verified;
      session.user.fullname = token.fullname;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.verified = user.verified;
        token.fullname = user.fullname;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
