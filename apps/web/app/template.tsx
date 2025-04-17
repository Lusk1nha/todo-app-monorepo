import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export default function RootTemplate(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  return (
    <div className={`${josefinSans.className} font-sans antialiased`}>
      <div className="bg-background w-full h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
