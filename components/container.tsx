import { ReactNode } from "react";
import { cx } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto max-w-md px-8", className)}>{children}</div>
  );
}
