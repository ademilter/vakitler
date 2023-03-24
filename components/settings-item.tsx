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
        "flex h-10 grow cursor-pointer select-none items-center gap-2 rounded-lg px-4",
        isSelected && "bg-white bg-opacity-80 dark:bg-opacity-10"
      )}
    >
      <input type="radio" {...props} />
      {children}
    </label>
  );
}
