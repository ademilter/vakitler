import React, { HTMLAttributes } from "react";
import Trans from "next-translate/Trans";
import { TimeNames } from "utils/types";
import useTranslation from "next-translate/useTranslation";
import { cx } from "utils/helper";
import { useStore } from "stores/global";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function RamadanTimer({ className }: Props) {
  const { t } = useTranslation("common");

  const { timerRamadan, settings, times } = useStore(store => ({
    settings: store.settings,
    times: store.times,
    timerRamadan: store.timerRamadan,
  }));

  const now = times?.time?.now;

  if (!now) return null;

  if (!settings.ramadanTimer) return null;

  if (![TimeNames.Imsak, TimeNames.Gunes, TimeNames.Ogle].includes(now))
    return null;

  return (
    <div
      className={cx(
        "inline-flex items-center gap-1 px-4 py-1",
        "rounded-xl bg-secondary text-primary shadow text-lg md:text-xl",
        className
      )}
    >
      <span>{t("iftarTime")}</span>

      <span className="inline-flex items-center gap-1">
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
