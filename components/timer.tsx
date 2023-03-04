import { TimeNames, TypeTimer } from "@/lib/types";
import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import useInterval from "@/lib/use-interval";

export default function Timer() {
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);
  const [timer, setTimer] = useState<TypeTimer>();

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

  if (!timer) return null;

  return (
    <span className="flex flex-col items-center">
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
              components={[<b key="timer" />]}
              values={{ second: timer[2] }}
              ns={"common"}
            />
          ) : timer[0] === 0 ? (
            <Trans
              i18nKey={`timer.minute`}
              components={[<b key="minute" />]}
              values={{ minute: timer[1] }}
              ns={"common"}
            />
          ) : (
            <Trans
              i18nKey={`timer.hour`}
              components={[<b key="hour" />, <b key="minute" />]}
              values={{ hour: timer[0], minute: timer[1] }}
              ns={"common"}
            />
          )}
        </span>
      </div>
    </span>
  );
}
