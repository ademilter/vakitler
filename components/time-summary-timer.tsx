import { HTMLAttributes, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import { cx } from "@/lib/utils";

export default function TimeSummaryTimer() {
  const { timer } = useContext(CommonStoreContext);

  return (
    <div className="flex items-baseline text-5xl font-light gap-2">
      {timer[0] === 0 && timer[1] === 0 ? (
        // 30 second
        <KeyValueComp>
          <Trans
            ns="common"
            i18nKey="timerSecond"
            components={[<ValueComp key="second" className="tabular-nums" />]}
            values={{ second: timer[2] }}
          />
        </KeyValueComp>
      ) : timer[0] === 0 ? (
        // 30 minute
        <KeyValueComp>
          <Trans
            ns="common"
            i18nKey="timerMinute"
            components={[<ValueComp key="minute" />]}
            values={{ minute: timer[1] }}
          />
        </KeyValueComp>
      ) : timer[1] === 0 ? (
        // 2 hour 0 minute
        <KeyValueComp>
          <Trans
            ns="common"
            i18nKey="timerHour"
            components={[<ValueComp key="hour" />]}
            values={{ hour: timer[0] }}
          />
        </KeyValueComp>
      ) : (
        // 2 hour 30 minute
        <>
          <KeyValueComp>
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timer[0] }}
            />
          </KeyValueComp>
          <KeyValueComp>
            <Trans
              ns="common"
              i18nKey="timerMinute"
              components={[<ValueComp key="minute" />]}
              values={{ minute: timer[1] }}
            />
          </KeyValueComp>
        </>
      )}
    </div>
  );
}

function KeyValueComp({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx("flex items-baseline gap-0.5", className)} {...props} />
  );
}

function ValueComp({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <b className={cx("font-semibold text-[1.1em]", className)} {...props} />
  );
}
