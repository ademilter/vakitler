import { HTMLAttributes, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import { TimeNames } from "@/types";

export default function RamadanTimer({ time }: { time: TimeNames }) {
  const { timerRamadan, times, settings } = useContext(CommonStoreContext);

  const now = times?.time?.now;

  if (!now) return null;

  if (!settings.ramadanTimer) return null;

  if (time !== TimeNames.Aksam) return null;

  if (![TimeNames.Imsak, TimeNames.Gunes, TimeNames.Ogle].includes(now))
    return null;

  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-2 py-1">
      <div className="relative z-10 text-base">
        {timerRamadan[0] === 0 && timerRamadan[1] === 0 ? (
          // 0 hour 0 minute 30 second
          <Trans
            i18nKey="timerSecond"
            components={[<ValueComp key="timer" />]}
            values={{ second: timerRamadan[2] }}
            ns="common"
          />
        ) : timerRamadan[0] === 0 ? (
          // 0 hour 30 minute
          <Trans
            ns="common"
            i18nKey="timerMinute"
            components={[<ValueComp key="minute" />]}
            values={{ minute: timerRamadan[1] }}
          />
        ) : timerRamadan[1] === 0 ? (
          // 2 hour 0 minute
          <Trans
            ns="common"
            i18nKey="timerHour"
            components={[<ValueComp key="hour" />]}
            values={{ hour: timerRamadan[0] }}
          />
        ) : (
          // 2 hour 30 minute
          <>
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timerRamadan[0] }}
            />{" "}
            <Trans
              ns="common"
              i18nKey="timerMinute"
              components={[<ValueComp key="minute" />]}
              values={{ minute: timerRamadan[1] }}
            />
          </>
        )}
      </div>

      <span className="absolute inset-0 rounded-xl bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-20" />
    </div>
  );
}

const ValueComp = (props: HTMLAttributes<HTMLSpanElement>) => (
  <b className="tabular-nums" {...props} />
);
