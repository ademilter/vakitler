import { cx } from "@/utils/helper";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useLocations from "@/hooks/use-locations";
import React from "react";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function Location({ className }: Props) {
  const { lang } = useTranslation("common");
  const { city } = useLocations();

  return (
    <Link
      href="/settings"
      className={cx(
        "inline-flex items-center",
        "tracking-wider font-medium text-sm",
        className
      )}
    >
      {city?.toLocaleUpperCase(lang)}
    </Link>
  );
}
