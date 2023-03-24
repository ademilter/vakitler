import React from "react";
import { cx } from "@/lib/utils";

export default function SettingsItem({
  children,
  isSelected = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  isSelected?: boolean;
}) {
  return (
    <label
      className={cx(
        "flex h-12 grow cursor-pointer select-none items-center gap-2 px-4",
        "first:rounded-l-lg last:rounded-r-lg",
        isSelected && "bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-10"
      )}
    >
      <input type="radio" {...props} />
      {children}
    </label>
  );
}
