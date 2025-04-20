export const SystemPath = {
  Home: "/",
  Login: "/signin",
  Register: "/signup",
  ResetPassword: "/reset-password",
} as const satisfies Record<string, string>;
