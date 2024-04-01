import { ReactNode } from "react";
import { cx } from "utils/helper";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto max-w-md px-5", className)}>{children}</div>
  );
}
