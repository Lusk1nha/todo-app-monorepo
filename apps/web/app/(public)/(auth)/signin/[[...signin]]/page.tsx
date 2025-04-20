import { SignInForm } from "../../../../../components/forms/signin-form/signin-form";
import { SystemPath } from "../../../../../shared/path";
import { AuthContent } from "../../_components/auth-content";
import { AuthHeader } from "../../_components/auth-header";

export default function SignInPage() {
  return (
    <AuthContent>
      <AuthHeader
        link={{
          href: SystemPath.Register,
          text: "Sign up",
        }}
        title="Login to your account"
        subtitle="Don’t have an account?"
      />

      <SignInForm />
    </AuthContent>
  );
}
