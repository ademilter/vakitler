import store from "@/stores/list";
import { cx } from "@/lib/utils";
import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto max-w-screen-sm px-8", className)}>
      {children}
    </div>
  );
}
