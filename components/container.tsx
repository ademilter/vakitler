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
    <div className={cx("mx-auto sm:max-w-md px-6", className)}>{children}</div>
  );
}
