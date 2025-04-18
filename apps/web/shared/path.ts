export const SystemPath = {
  Home: "/",
  Login: "/auth/signin",
  Register: "/auth/signup",
} as const satisfies Record<string, string>;
