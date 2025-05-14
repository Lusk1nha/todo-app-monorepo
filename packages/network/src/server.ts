import { JWT } from "next-auth/jwt";

interface LoginInput {
  email: string;
  password: string;
}

interface TokenResponse {
  tokenType: string;

  refreshToken: string;
  refreshTokenExpires: number;

  accessToken: string;
  accessTokenExpires: number;
}

interface LoginResponse {
  user: {
    uid: string;
    name: string;
    image?: string;
  };

  token: TokenResponse;
}

export async function fetchLoginUser(payload: LoginInput): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function fetchRegisterUser(
  accessToken: string
): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

export async function refreshAccessToken(token: JWT) {
  console.log("Refreshing access token");
  try {
    const url = "https://api.playin.gg/auth/refresh";

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    console.log("Refreshed access token");
    console.log(refreshedTokens);

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.data.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
