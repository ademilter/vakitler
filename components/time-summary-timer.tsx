import { TimeNames } from "@/lib/types";
import { HTMLAttributes } from "react";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { useTimerStore } from "@/stores";

export default function TimeSummaryTimer() {
  const { t } = useTranslation("common");

  const { timer, times } = useTimerStore();

  let timeName = t(times?.time.next as TimeNames);
  if (times?.today?.isJumuah && times?.time.next === TimeNames.Ogle) {
    timeName = t("Jumuah");
  }

  return (
    <div className="relative z-10 flex flex-col items-center px-6 py-2 text-xl">
      <span className="absolute inset-0 rounded-2xl bg-current opacity-10" />

      <span className="flex text-sm opacity-80">
        <Trans
          ns={"common"}
          i18nKey="timerTitle"
          values={{
            time: timeName,
          }}
        />
      </span>

      <div className="relative z-10">
        {timer[0] === 0 && timer[1] === 0 ? (
          // 0 hour 0 minute 30 second
          <Trans
            ns="common"
            i18nKey="timerSecond"
            components={[<ValueComp key="timer" />]}
            values={{ second: timer[2] }}
          />
        ) : timer[0] === 0 ? (
          // 0 hour 30 minute
          <Trans
            ns="common"
            i18nKey="timerMinute"
            components={[<ValueComp key="minute" />]}
            values={{ minute: timer[1] }}
          />
        ) : timer[1] === 0 ? (
          // 2 hour 0 minute
          <Trans
            ns="common"
            i18nKey="timerHour"
            components={[<ValueComp key="hour" />]}
            values={{ hour: timer[0] }}
          />
        ) : (
          // 2 hour 30 minute
          <>
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timer[0] }}
            />{" "}
            <Trans
              ns="common"
              i18nKey="timerMinute"
              components={[<ValueComp key="minute" />]}
              values={{ minute: timer[1] }}
            />
          </>
        )}
      </div>
    </div>
  );
}

const ValueComp = (props: HTMLAttributes<HTMLSpanElement>) => (
  <b className="tabular-nums" {...props} />
);
