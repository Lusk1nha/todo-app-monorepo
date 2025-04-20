import Link from "next/link";

interface AuthLink {
  href: string;
  text: string;
}

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  link: AuthLink;
}

export function AuthHeader(props: Readonly<AuthHeaderProps>) {
  const { subtitle, title, link } = props;

  return (
    <header className="flex flex-col gap-y-4">
      <h1 className="text-3xl sm:text-5xl font-normal text-start">
        {title}
      </h1>

      <p className="text-action-text text-sm font-normal">
        {subtitle}{" "}
        <Link
          className="text-primary underline"
          href={link.href}
          aria-label={link.text}
        >
          {link.text}
        </Link>
      </p>
    </header>
  );
}
