import { HTMLAttributes, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import { TimeNames } from "@/types";
import useTranslation from "next-translate/useTranslation";

export default function RamadanTimer() {
  const { t } = useTranslation("common");
  const { timerRamadan, times, timer, settings } =
    useContext(CommonStoreContext);

  const now = times?.time?.now;

  if (!now) return null;

  if (!settings.ramadanTimer) return null;

  if (![TimeNames.Imsak, TimeNames.Gunes, TimeNames.Ogle].includes(now))
    return null;

  return (
    <div className="relative z-0 px-4 py-1 flex gap-1 items-center text-base md:text-xl">
      <span className="absolute -z-10 inset-0 rounded-xl bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-20 shadow" />

      <span>{t("iftarTime")}</span>

      <span className="flex items-center gap-1">
        {timerRamadan[0] > 0 && (
          <span className="flex items-baseline gap-px">
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" className="font-semibold" />]}
              values={{ hour: timerRamadan[0] }}
            />
          </span>
        )}
        <span className="flex items-baseline gap-px">
          <Trans
            ns="common"
            i18nKey="timerMinute"
            components={[<ValueComp key="minute" className="font-semibold" />]}
            values={{ minute: timerRamadan[1] }}
          />
        </span>
      </span>
    </div>
  );
}

const ValueComp = (props: HTMLAttributes<HTMLSpanElement>) => (
  <b className="tabular-nums" {...props} />
);
