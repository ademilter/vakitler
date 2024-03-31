import React, { useContext } from "react";
import { cx } from "@/utils/helper";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import { DateTime } from "luxon";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function IslamicDate({ className }: Props) {
  const { times } = useContext(CommonStoreContext);
  const { lang } = useTranslation("common");
  const localTime = times?.localTime || DateTime.local();

  // hicri takvimde akşam ezanı ile tarih bir sonraki güne geçer
  // const isDayEnd =
  //   times?.today && times.isBeforeMidnight
  //   localTime >= DateTime.fromFormat(times.today[TimeNames.Aksam], HOUR_FORMAT);

  const date = DateTime.fromJSDate(localTime.toJSDate())
    // .plus({ days: isDayEnd ? 1 : 0 })
    .toLocaleString(DateTime.DATE_FULL, {
      locale: lang,
      outputCalendar: "islamic",
    });

  return <div className={cx(className)}>{date}</div>;
}
