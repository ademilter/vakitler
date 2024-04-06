import React from "react";
import { cx } from "utils/helper";
import useTranslation from "next-translate/useTranslation";
import { useStore } from "stores/global";
import { TimeNames } from "utils/types";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function IslamicDate({ className }: Props) {
  const { lang } = useTranslation("common");

  const { times } = useStore(store => ({
    times: store.times,
  }));

  // hicri takvimde akşam ezanı ile tarih bir sonraki güne geçer
  const isEndDay =
    times?.isBeforeMidnight &&
    [TimeNames.Aksam, TimeNames.Imsak].includes(times.time.now);

  return (
    <div className={cx(className)}>
      {isEndDay ? times?.tomorrow.HicriTarihUzun : times?.today.HicriTarihUzun}
    </div>
  );
}
