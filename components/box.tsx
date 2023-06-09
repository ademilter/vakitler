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
      className={cx("rounded-xl bg-white dark:bg-zinc-800", className)}
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
      className={cx("flex items-center px-4 py-3", className)}
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
  last,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  isSelected?: boolean;
  className?: string;
  last?: boolean;
}) {
  const showBorder = !(isSelected || last);

  return (
    <label
      className={cx(
        "relative flex h-12 grow items-center gap-2 px-4",
        "rounded-lg border border-transparent",
        "cursor-pointer select-none first:rounded-t-lg last:rounded-b-lg",
        isSelected && "z-10 border-zinc-200 dark:border-zinc-700",
        className
      )}
    >
      {showBorder && (
        <div className="pointer-events-none absolute -bottom-[2px] left-4 right-4 h-px bg-zinc-100 dark:bg-opacity-5" />
      )}

      <span className="grow">{children}</span>
      <input type="radio" {...props} />
    </label>
  );
}

BoxBodyRadio.displayName = "BoxBodyRadio";
Box.BodyRadio = BoxBodyRadio;

function BoxBodyToggle({
  children,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cx(
        "relative flex h-12 grow items-center gap-2 px-4",
        "rounded-lg border border-transparent",
        "cursor-pointer select-none",
        className
      )}
    >
      <span className="grow">{children}</span>
      <input className="mr-2" type="checkbox" {...props} />
    </label>
  );
}

BoxBodyToggle.displayName = "BoxBodyToggle";
Box.BoxBodyToggle = BoxBodyToggle;
