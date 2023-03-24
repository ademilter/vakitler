import React, { ReactNode } from "react";
import { cx } from "@/lib/utils";
import Link from "next/link";

export default function Box({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  const childs: React.ReactNode[] = React.Children.map(
    // @ts-ignore
    children,
    (child: React.ReactElement) => {
      return React.cloneElement(child, {
        ...child.props,
      });
    }
  );

  const BoxTitle = childs.find(
    (child: any) => child.type.displayName === "BoxTitle"
  );
  const BoxBody = childs.find(
    (child: any) => child.type.displayName === "BoxBody"
  );

  return (
    <div className={cx(className)} {...props}>
      {BoxTitle}
      {BoxBody}
    </div>
  );
}

function BoxTitle({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h5
      className={cx(
        "mb-1 px-4 text-xs font-normal uppercase opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
}

BoxTitle.displayName = "BoxTitle";
Box.Title = BoxTitle;

function BoxBody({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx("rounded-xl bg-zinc-100 dark:bg-zinc-800", className)}
      {...props}
    >
      {children}
    </div>
  );
}

BoxBody.displayName = "BoxBody";
Box.Body = BoxBody;

function BoxBodyLink({
  href,
  className,
  children,
  icon,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  const Comp = props.target ? "a" : Link;

  return (
    <Comp
      href={href}
      className={cx("flex items-center py-3 px-4", className)}
      {...props}
    >
      <div className="grow">{children}</div>

      <span className="flex shrink-0 items-center justify-center">
        {icon ?? (
          <svg
            className="opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        )}
      </span>
    </Comp>
  );
}

BoxBodyLink.displayName = "BoxBodyLink";
Box.BodyLink = BoxBodyLink;

function BoxBodyRadio({
  children,
  isSelected = false,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  isSelected?: boolean;
  className?: string;
}) {
  return (
    <label
      className={cx(
        "relative flex h-10 grow items-center gap-2 px-4",
        "cursor-pointer select-none",
        "first:rounded-t-lg last:rounded-b-lg",
        isSelected && "z-10 rounded-lg bg-white shadow-sm dark:bg-zinc-700",
        className
      )}
    >
      {/* TODO: hide last item */}
      {!isSelected && (
        <div className="pointer-events-none absolute left-4 -bottom-px right-4 h-px bg-zinc-200 dark:bg-opacity-10" />
      )}

      <span className="grow">{children}</span>
      <input type="radio" {...props} />
    </label>
  );
}

BoxBodyRadio.displayName = "BoxBodyRadio";
Box.BodyRadio = BoxBodyRadio;
