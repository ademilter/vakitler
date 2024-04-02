import React, { HTMLAttributes } from "react";
import Trans from "next-translate/Trans";
import { cx } from "utils/helper";
import { useStore } from "stores/global";
import { motion } from "framer-motion";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function TimeSummaryTimer({ className }: Props) {
  const { timer } = useStore(store => ({
    timer: store.timer,
  }));

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cx(
        "flex items-baseline justify-center text-5xl md:text-6xl font-light gap-2",
        className
      )}
    >
      {timer[0] > 0 ? (
        <>
          <KeyValueComp>
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timer[0] }}
            />
          </KeyValueComp>
          {timer[1] > 0 && (
            <KeyValueComp>
              <Trans
                ns="common"
                i18nKey="timerMinute"
                components={[<ValueComp key="minute" />]}
                values={{ minute: timer[1] }}
              />
            </KeyValueComp>
          )}
        </>
      ) : (
        <>
          {timer[1] > 0 && (
            <KeyValueComp>
              <Trans
                ns="common"
                i18nKey="timerMinute"
                components={[<ValueComp key="minute" />]}
                values={{ minute: timer[1] }}
              />
            </KeyValueComp>
          )}
          {timer[1] === 0 && (
            <KeyValueComp>
              <Trans
                ns="common"
                i18nKey="timerSecond"
                components={[
                  <ValueComp key="second" className="tabular-nums" />,
                ]}
                values={{ second: timer[2] }}
              />
            </KeyValueComp>
          )}
        </>
      )}
    </motion.div>
  );
}

function KeyValueComp({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx("inline-flex items-baseline gap-0.5", className)}
      {...props}
    />
  );
}

function ValueComp({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <b className={cx("font-semibold text-[1.1em]", className)} {...props} />
  );
}
