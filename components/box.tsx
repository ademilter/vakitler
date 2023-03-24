import { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { ClassValue } from "clsx";

export default function Box({
  children,
  className,
  helperClass,
  ...props
}: {
  children: ReactNode;
  className?: ClassValue;
  helperClass?: ClassValue;
}) {
  return (
    <div className={cx("relative z-10 rounded-xl", className)} {...props}>
      <span
        className={cx(
          "pointer-events-none absolute inset-0 -z-10 rounded-xl bg-current opacity-10",
          helperClass
        )}
      />

      {children}
    </div>
  );
}
