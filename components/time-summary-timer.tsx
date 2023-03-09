import { TimeNames } from "@/lib/types";
import { HTMLAttributes, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";

export default function TimeSummaryTimer() {
  const { t } = useTranslation("common");

  const { timer, times } = useContext(CommonStoreContext);

  const ValueComp = (props: HTMLAttributes<HTMLSpanElement>) => (
    <b className="tabular-nums" {...props} />
  );

  return (
    <div className="relative z-10 flex flex-col items-center px-6 py-2 text-xl">
      <span className="absolute inset-0 rounded-2xl bg-current opacity-10" />

      <span className="flex text-sm opacity-80">
        <Trans
          i18nKey="timerReminder"
          values={{
            time: t(`times${times?.time.next as TimeNames}`),
          }}
          ns={"common"}
        />
      </span>

      <div className="relative z-10">
        {timer[0] === 0 && timer[1] === 0 ? (
          // 0 hour 0 minute 30 second
          <Trans
            i18nKey="timerSecond"
            components={[<ValueComp key="timer" />]}
            values={{ second: timer[2] }}
            ns="common"
          />
        ) : timer[0] === 0 ? (
          // 0 hour 30 minute
          <Trans
            i18nKey="timerMinute"
            components={[<ValueComp key="minute" />]}
            values={{ minute: timer[1] }}
            ns="common"
          />
        ) : timer[1] === 0 ? (
          // 2 hour 0 minute
          <Trans
            i18nKey="timerHour"
            components={[<ValueComp key="hour" />]}
            values={{ hour: timer[0] }}
            ns="common"
          />
        ) : (
          // 2 hour 30 minute
          <>
            <Trans
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timer[0] }}
              ns="common"
            />{" "}
            <Trans
              i18nKey="timerMinute"
              components={[<ValueComp key="minute" />]}
              values={{ minute: timer[1] }}
              ns="common"
            />
          </>
        )}
      </div>
    </div>
  );
}
