import React from "react";
import { cx } from "utils/helper";
import useTranslation from "next-translate/useTranslation";
import { DateTime } from "luxon";
import { useStore } from "stores/global";
import { TimeNames } from "utils/types";
import { HOUR_FORMAT } from "utils/const";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function IslamicDate({ className }: Props) {
  const { lang } = useTranslation("common");

  const { times } = useStore(store => ({
    times: store.times,
  }));

  const localTime = times?.localTime || DateTime.local();

  // hicri takvimde akşam ezanı ile tarih bir sonraki güne geçer
  const isTimeAksam =
    times?.today &&
    times.isBeforeMidnight &&
    localTime >= DateTime.fromFormat(times.today[TimeNames.Aksam], HOUR_FORMAT);

  const date = DateTime.fromJSDate(localTime.toJSDate())
    .plus({ days: isTimeAksam ? 1 : 0 })
    .toLocaleString(DateTime.DATE_FULL, {
      locale: lang,
      outputCalendar: "islamic",
    });

  return <div className={cx(className)}>{date}</div>;
}
