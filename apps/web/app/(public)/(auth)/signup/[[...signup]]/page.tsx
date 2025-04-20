import { SignUpForm } from "../../../../../components/forms/signup-form/signup-form";
import { SystemPath } from "../../../../../shared/path";
import { AuthContent } from "../../_components/auth-content";
import { AuthHeader } from "../../_components/auth-header";

export default function SignUpPage() {
  return (
    <AuthContent>
      <AuthHeader
        link={{
          href: SystemPath.Login,
          text: "Sign in",
        }}
        title="Create an account"
        subtitle="Already have an account?"
      />
      <SignUpForm />
    </AuthContent>
  );
}
