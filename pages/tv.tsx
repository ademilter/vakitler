import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import TimeLocation from "@/components/time-location";
import TimeSummary from "@/components/time-summary";
import TimeTravel from "@/components/time-travel";
import MainPage from "@/components/tv/main-tv";
import { TimeNames } from "@/lib/types";
import { cx, formattedTime } from "@/lib/utils";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";

export default function Index() {
  const {
    times,
    settings: { timeFormat },
  } = useContext(CommonStoreContext);
  const { t, lang } = useTranslation("common");

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  if (!times) return null;

  return (
    <MainPage>
      <div className="p-20 flex flex-col items-center">
        <TimeLocation />
        <TimeSummary />
      </div>
      <div className="w-full p-20 h-full">
        <div className="grid h-full">
          {Object.keys(TimeNames).map((key, index) => {
            const now = times?.time?.now;
            const isTimeActive = now === key;

            const value = times?.today?.[key as TimeNames];
            const formattedValue = formattedTime(timeFormat, value, lang);

            let timeName = t(key);
            if (key === TimeNames.Ogle && times?.today?.isJumuah) {
              timeName = `${t("Jumuah")} 🕌`;
            }

            return (
              <div key={key} className={cx("relative grow h-full")}>
                <Container
                  className={cx(
                    "flex h-full",
                    isTimeActive && "py-2"
                    // timeIndex < nowIndex && "opacity-60 dark:opacity-40"
                  )}
                >
                  <div className="relative flex h-full w-full items-center justify-between px-10 py-3 text-xl md:text-xl">
                    <h5
                      className={cx(
                        "capitalize leading-none"
                        // timeIndex < nowIndex && "font-normal"
                      )}
                    >
                      {timeName}
                    </h5>
                    <h4
                      className={cx(
                        "tabular-nums leading-none"
                        // timeIndex < nowIndex && "font-normal"
                      )}
                    >
                      {formattedValue}
                    </h4>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>
      </div>
      <TimeTravel />
    </MainPage>
  );
}
