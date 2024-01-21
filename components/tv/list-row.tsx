import { TimeNames } from "@/lib/types";
import Container from "@/components/container";
import { cx, formattedTime } from "@/lib/utils";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";

export default function TimeListRow({
  time,
  index,
}: {
  time: TimeNames;
  index: number;
}) {
  const { t, lang } = useTranslation("common");

  const {
    times,
    settings: { timeFormat },
  } = useContext(CommonStoreContext);

  const value = times?.today && times?.today?.[time];

  const formattedValue = formattedTime(timeFormat, value, lang);

  const now = times?.time?.now;
  const isTimeActive = now === time;

  const next = times?.time?.next;
  const isTimeNext = next === time;

  const timeIndex = Object.keys(TimeNames).indexOf(time ?? "");
  const nowIndex = Object.keys(TimeNames).indexOf(now ?? "");

  if (!times) return null;

  let timeName = t(time);
  if (time === TimeNames.Ogle && times?.today?.isJumuah) {
    timeName = `${t("Jumuah")} 🕌`;
  }

  return (
    <div className={cx("relative grow h-full")}>
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
}
