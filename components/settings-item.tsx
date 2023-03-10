import React from "react";
import { clsx } from "clsx";

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
      className={clsx(
        "flex h-12 grow cursor-pointer items-center gap-2 px-4",
        "bg-white first:rounded-l-lg last:rounded-r-lg",
        isSelected && "bg-blue-50",
        "hover:bg-blue-50"
      )}
    >
      <input type="radio" {...props} />
      {children}
    </label>
  );
}
