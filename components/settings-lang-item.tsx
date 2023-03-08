import React from "react";
import { clsx } from "clsx";

export default function SettingsLangItem({
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
        "flex cursor-pointer items-center gap-2 px-4",
        "first:rounded-l-lg last:rounded-r-lg",
        isSelected && "bg-white"
      )}
    >
      <input type="radio" {...props} />
      {children}
    </label>
  );
}
