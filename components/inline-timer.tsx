import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import Trans from "next-translate/Trans";
import { TypeTimer } from "@/lib/types";

type PropsType = {
  timer: TypeTimer;
  hide: boolean;
};

export default function InlineTimer({ timer, hide }: PropsType) {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <motion.div
        animate={hide ? "closed" : "open"}
        transition={{ duration: 0.3 }}
        variants={{
          closed: {
            opacity: 0,
            transform: "translateY(50%) scale(0.8)",
          },
          open: {
            opacity: 1,
            scale: 1,
            transform: "translateY(0) scale(1)",
          },
        }}
        className="rounded-xl bg-white bg-opacity-80 px-2 py-1 dark:bg-black dark:bg-opacity-20"
      >
        <div className="relative z-10 text-base">
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
      </motion.div>
    </div>
  );
}

const ValueComp = (props: HTMLAttributes<HTMLSpanElement>) => (
  <b className="tabular-nums" {...props} />
);
