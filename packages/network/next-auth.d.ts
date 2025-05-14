import type { DefaultUser } from "next-auth";

interface TokenResponse {
  tokenType: string;

  refreshToken: string;
  accessToken: string;

  accessTokenExpires: number;
}

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      uid: string;
      image?: string;
    };

    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;

    error?: "RefreshTokenError";
  }

  interface User extends DefaultUser {
    user: {
      uid: string;
      name: string;
      image?: string;
    };

    token: TokenResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends TokenResponse {
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/user" {
  interface User {
    uid: string;
    image?: string;
    access_token: string;
    refresh_token: string;
  }
}
