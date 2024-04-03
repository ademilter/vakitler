import React from "react";
import { cx } from "utils/helper";
import Link, { LinkProps } from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {}

export function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cx(
        "grid grid-cols-3 items-center px-6 py-4 mb-6",
        // "border-b border-b-zinc-300 dark:border-b-zinc-800",
        className
      )}
      {...props}
    />
  );
}

// Left

export interface HeaderLeftProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export function HeaderLeft({ className, ...props }: HeaderLeftProps) {
  return <div className={cx("flex items-center", className)} {...props} />;
}

// Content

export interface HeaderContentProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export function HeaderContent({ className, ...props }: HeaderContentProps) {
  return <div className={cx("text-center", className)} {...props} />;
}

// Title

export interface HeaderContentTitleProps
  extends React.ComponentPropsWithoutRef<"h3"> {}

export function HeaderContentTitle({
  className,
  ...props
}: HeaderContentTitleProps) {
  return <h3 className={cx("text-lg font-semibold", className)} {...props} />;
}

// Button

export interface HeaderBackButtonProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

export function HeaderBackButton({
  children,
  className,
  ...props
}: HeaderBackButtonProps) {
  return (
    <Link className={cx("flex items-center", className)} {...props}>
      {children || <IconChevronLeft size={24} stroke={1.5} className="" />}
    </Link>
  );
}
