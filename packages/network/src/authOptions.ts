import { NextAuthOptions, getServerSession } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import {
  fetchLoginUser,
  fetchRegisterUser,
  refreshAccessToken,
} from "./server";

const secureCookies = process.env.NODE_ENV === "production";
const hostName = "localhost";
const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        const response = await fetchLoginUser({
          email,
          password,
        });

        const user = await response.json();

        if (!response.ok) {
          throw new Error("Wrong username or password!");
        }

        if (response.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],

  debug: true,

  cookies: {
    sessionToken: {
      name: `${secureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: secureCookies,
        domain: hostName == "localhost" ? hostName : "." + rootDomain,
      },
    },
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("JWT", user);

      if (user) {
        token.id = user.user.uid;
        token.name = user.user.name;
        token.accessToken = user.token.accessToken;
        token.refreshToken = user.token.refreshToken;
        token.accessTokenExpires =
          Date.now() + (user.token.accessTokenExpires ?? 3600) * 1000;
      }

      console.log("Token", token);

      return token;
    },

    session: async ({ session, token }) => {
      console.log("Session", session, token);

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;

      const response = await fetchRegisterUser(token.accessToken);
      const user = await response.json();

      session.user.id = user.id;
      session.user.name = user.name;

      console.log("Session", session);

      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

export const getAuth = () => getServerSession(authOptions);
