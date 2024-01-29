import React, { forwardRef, ReactNode } from "react";
import { cx } from "@/utils/helper";
import Link from "next/link";
import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react";
import * as Select from "@radix-ui/react-select";
import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import useTranslation from "next-translate/useTranslation";
import * as Switch from "@radix-ui/react-switch";
import { SwitchProps } from "@radix-ui/react-switch";

export default function Box({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex items-center py-3 px-4 border-b last:border-b-0 border-b-zinc-100 dark:border-b-zinc-900 gap-2",
        className
      )}
      {...props}
    >
      {children}
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
    <h5 className={cx("font-normal opacity-80", className)} {...props}>
      {children}
    </h5>
  );
}

Box.Title = BoxTitle;

function BoxContainer({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Box.BoxContainer = BoxContainer;

function BoxLink({
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
      className={cx("w-full flex gap-2 items-center", className)}
      {...props}
    >
      <div className="grow">{children}</div>

      <span className="flex shrink-0 items-center justify-center">
        {icon ?? <IconChevronRight size={16} className="opacity-40" />}
      </span>
    </Comp>
  );
}

Box.BoxLink = BoxLink;

function BoxSelect({
  className,
  value,
  data,
  ...props
}: SelectProps & {
  value: string;
  className?: string;
  data: [string, string][];
}) {
  const { t } = useTranslation("common");

  return (
    <>
      <Select.Root {...props}>
        <Select.Trigger
          className={cx(
            "inline-flex items-center justify-center select-none h-10 leading-none font-semibold gap-2 outline-none"
          )}
        >
          <Select.Value placeholder={value} />
          <Select.Icon>
            <IconChevronDown size={16} className="opacity-40" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-white dark:bg-zinc-800
          shadow-2xl rounded-xl border border-zinc-200 dark:border-zinc-700"
          >
            <Select.ScrollUpButton className="flex items-center justify-center">
              <IconChevronUp size={14} />
            </Select.ScrollUpButton>
            {/**/}
            <Select.Viewport className="p-2">
              <Select.Group>
                {data.map(([value, label], i) => (
                  <SelectItem key={value} value={value}>
                    {t(label)}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center">
              <IconChevronDown size={14} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

Box.BodySelect = BoxSelect;

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<
  {
    children?: ReactNode;
    className: string;
  },
  SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      // @ts-ignore TODO: ?
      ref={forwardedRef}
      className={cx(
        "leading-none h-10 pl-4 rounded-lg pr-6 flex gap-2 items-center relative select-none",
        "data-[state=checked]:bg-emerald-50",
        "dark:data-[state=checked]:bg-emerald-800",
        "outline-none",
        className
      )}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>

      <Select.ItemIndicator className="inline-flex items-center justify-center">
        <IconCheck size={16} className="text-emerald-500" />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

function BoxSwitch({ className, ...props }: SwitchProps & {}) {
  return (
    <Switch.Root
      className={cx(
        "relative h-7 w-11 bg-zinc-400 rounded-full",
        "data-[state=checked]:bg-emerald-500"
      )}
      {...props}
    >
      <Switch.Thumb
        className="block size-5
                  bg-white rounded-full
                  transition-transform will-change-transform duration-100
                  translate-x-1
                  data-[state=checked]:translate-x-5"
      />
    </Switch.Root>
  );
}

Box.BoxSwitch = BoxSwitch;
