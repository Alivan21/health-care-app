export default function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-8 py-6">{children}</main>;
}
