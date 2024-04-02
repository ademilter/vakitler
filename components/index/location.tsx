import { cx } from "utils/helper";
import useTranslation from "next-translate/useTranslation";
import useLocations from "hooks/use-locations";
import React from "react";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function Location({ className }: Props) {
  const { lang } = useTranslation("common");
  const { city } = useLocations();

  return (
    <span className={cx("tracking-wider font-medium", className)}>
      {city?.toLocaleUpperCase(lang)}
    </span>
  );
}
