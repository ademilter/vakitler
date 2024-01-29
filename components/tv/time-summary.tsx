import { TimeNames } from "@/types";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import TimeSummaryTimer from "@/components/time-summary-timer";
import Trans from "next-translate/Trans";

export default function TimeSummary() {
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);

  let timeName = t(times!.time.next as TimeNames);
  if (times!.today?.isJumuah && times!.time.next === TimeNames.Ogle) {
    timeName = t("Jumuah");
  }

  return (
    <div className="flex gap-1 flex-col items-center justify-center">
      <span className="flex capitalize text-xl font-semibold">
        <Trans
          ns={"common"}
          i18nKey="timerTitle"
          values={{
            time: timeName,
          }}
        />
      </span>

      <TimeSummaryTimer />
    </div>
  );
}
