export default function RootTemplate(
  props: Readonly<{ children: React.ReactNode }>
) {
  const { children } = props;

  return (
    <div className="bg-background w-full h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
