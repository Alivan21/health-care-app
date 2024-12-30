import { cn } from "@/lib/utils";

export default function MainContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <main className={cn("px-8 py-6", className)}>{children}</main>;
}
