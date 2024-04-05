import React from "react";
import { cx } from "utils/helper";

export interface Props extends React.ComponentPropsWithoutRef<"span"> {}

export default function NotifyBubble({ children, className, ...props }: Props) {
  return (
    <span
      className={cx(
        "relative inline-flex items-center justify-center",
        className
      )}
      title="Bildirimler"
      {...props}
    >
      <span className="absolute z-10 text-primary text-xs font-mono font-bold">
        {children}
      </span>

      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.6198 7.25952C18.858 7.7291 17.9606 8 17 8C14.2386 8 12 5.76142 12 3C12 2.03937 12.2709 1.14202 12.7405 0.38017C11.8696 0.132551 10.9503 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 9.04972 19.8674 8.1304 19.6198 7.25952Z"
          fill="currentColor"
          className="text-secondary"
        />
        <circle
          cx="17"
          cy="3"
          r="3"
          fill="currentColor"
          className="fill-red-500"
        />
      </svg>
    </span>
  );
}
