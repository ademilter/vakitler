import { TimeNames, TypeTimer } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import useInterval from "@/lib/use-interval";
import { motion } from "framer-motion";
import Icon, { ICON_NAMES } from "@/components/icon";

export default function Timer() {
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);
  const [timer, setTimer] = useState<TypeTimer>([0, 0, 0]);

  useInterval(
    () => {
      setTimer(times?.timer as TypeTimer);
    },
    times ? 1000 : null
  );

  useEffect(() => {
    if (!times) return;
    setTimer(times?.timer as TypeTimer);
  }, [times]);

  return (
    <motion.div
      variants={{
        open: {
          y: 0,
          scale: 1,
          opacity: 1,
        },
        closed: {
          y: 30,
          scale: 0.9,
          opacity: 0,
        },
      }}
      transition={{
        delay: 0.3,
      }}
      className="flex flex-col items-center"
    >
      {/*<Icon icon={times?.iconName as keyof typeof ICON_NAMES} size={32} />*/}

      <h2 className="text-4xl capitalize">
        {t(
          `times.${times?.time.now as TimeNames}`,
          {},
          {
            returnObjects: true,
          }
        )}
      </h2>

      <div className="relative z-10 mt-4 px-4 py-2 text-xl">
        <span className="absolute inset-0 rounded-2xl bg-current opacity-10" />
        <span className="relative z-10">
          {timer[0] === 0 && timer[1] === 0 ? (
            <Trans
              i18nKey={`timer.second`}
              components={[<b key="timer" className="tabular-nums" />]}
              values={{ second: timer[2] }}
              ns={"common"}
            />
          ) : timer[0] === 0 ? (
            <Trans
              i18nKey={`timer.minute`}
              components={[<b key="minute" className="tabular-nums" />]}
              values={{ minute: timer[1] }}
              ns={"common"}
            />
          ) : (
            <Trans
              i18nKey={`timer.hour`}
              components={[
                <b key="hour" className="tabular-nums" />,
                <b key="minute" className="tabular-nums" />,
              ]}
              values={{ hour: timer[0], minute: timer[1] }}
              ns={"common"}
            />
          )}
        </span>
      </div>
    </motion.div>
  );
}
