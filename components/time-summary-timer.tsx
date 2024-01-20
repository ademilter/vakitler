import { HTMLAttributes, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";

export default function TimeSummaryTimer() {
  const { timer } = useContext(CommonStoreContext);

  return (
    <>
      {timer[0] === 0 && timer[1] === 0 ? (
        // 30 second
        <Trans
          ns="common"
          i18nKey="timerSecond"
          components={[
            <b key="timer" className="tabular-nums font-semibold" />,
          ]}
          values={{ second: timer[2] }}
        />
      ) : timer[0] === 0 ? (
        // 30 minute
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
          <span className="flex gap-0.5">
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timer[0] }}
            />
          </span>
          <span className="flex gap-0.5">
            <Trans
              ns="common"
              i18nKey="timerMinute"
              components={[<ValueComp key="minute" />]}
              values={{ minute: timer[1] }}
            />
          </span>
        </>
      )}
    </>
  );
}

const ValueComp = (props: HTMLAttributes<HTMLSpanElement>) => (
  <b className="font-semibold" {...props} />
);
