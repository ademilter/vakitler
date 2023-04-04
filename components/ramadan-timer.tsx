import { HTMLAttributes } from "react";
import Trans from "next-translate/Trans";
import { useTimerStore } from "@/stores";

export default function RamadanTimer() {
  const { timerRamadan } = useTimerStore();

  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center py-1 px-2">
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
