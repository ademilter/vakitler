import { clsx } from "clsx";
import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto max-w-md px-6", className)}>{children}</div>
  );
}
