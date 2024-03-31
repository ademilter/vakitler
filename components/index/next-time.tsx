import { TimeNames } from "@/types";
import React, { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { cx } from "@/utils/helper";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function NextTime({ className }: Props) {
  const { t } = useTranslation("common");
  const { times } = useContext(CommonStoreContext);

  let timeName = t(times?.time.next as TimeNames);

  if (times?.today?.isJumuah && times?.time.next === TimeNames.Ogle) {
    timeName = t("Jumuah");
  }

  return (
    <div className={cx("uppercase font-medium tracking-wide", className)}>
      <Trans
        ns={"common"}
        i18nKey="timerTitle"
        values={{
          time: timeName,
        }}
      />
    </div>
  );
}
