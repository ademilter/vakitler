import React, { forwardRef, ReactNode } from "react";
import { cx } from "utils/helper";
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
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  RadioGroupItemProps,
  RadioGroupProps,
} from "@radix-ui/react-radio-group";

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
        {/* trigger */}
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

        {/* portal */}
        <Select.Portal>
          {/* up */}
          <Select.Content
            className="overflow-hidden bg-white dark:bg-zinc-800
          shadow-2xl rounded-xl border border-zinc-200 dark:border-zinc-700"
          >
            <Select.ScrollUpButton className="flex items-center justify-center">
              <IconChevronUp size={14} />
            </Select.ScrollUpButton>

            {/* list */}
            <Select.Viewport className="p-2">
              <Select.Group>
                {data.map(([value, label], i) => (
                  <SelectItem key={value} value={value}>
                    {t(label)}
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>

            {/* down */}
            <Select.ScrollDownButton className="flex items-center justify-center">
              <IconChevronDown size={14} />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
}

Box.BoxSelect = BoxSelect;

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

function BoxRadio({
  items,
  className,
  ...props
}: RadioGroupProps & {
  items: RadioGroupItemProps[];
}) {
  return (
    <RadioGroup.Root
      className="flex items-center gap-0.5 bg-zinc-200 dark:bg-zinc-900 p-0.5 rounded-lg overflow-hidden"
      {...props}
    >
      {items.map(item => (
        <RadioGroup.Item
          key={item.value}
          className="flex items-center justify-center px-3 h-7
          cursor-default rounded-md
          data-[state='checked']:font-semibold
          data-[state='checked']:shadow
          data-[state='checked']:bg-white
          dark:data-[state='checked']:bg-zinc-800"
          {...item}
        >
          {item["aria-label"]}
          <RadioGroup.Indicator className="text-emerald-500 ml-1 -mr-1" asChild>
            <IconCheck size={16} />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}

Box.BoxRadio = BoxRadio;
