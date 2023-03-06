import React, { useCallback, useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";

const buttonBaseClasses = "rounded py-1 px-2 text-xs font-bold text-white";

const backgroundColors = {
  [TimeNames.Imsak]: "bg-sky-700",
  [TimeNames.Gunes]: "bg-orange-700",
  [TimeNames.Ogle]: "bg-yellow-700",
  [TimeNames.Ikindi]: "bg-amber-700",
  [TimeNames.Aksam]: "bg-blue-700",
  [TimeNames.Yatsi]: "bg-indigo-700",
};

export default function TimePicker() {
  const { times, localTime, setLocalTime, fetchData } =
    useContext(CommonStoreContext);
  const now = times?.time?.now;
  const backgroundColor = now ? backgroundColors[now] : "";

  useEffect(() => {
    const rawSettings = localStorage.getItem("VAKITLER_SETTINGS");
    const settings = JSON.parse(rawSettings ?? "{}");
    if (settings.city.IlceID) fetchData(settings.city.IlceID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTime]);

  const onForwardClick = useCallback(
    () => setLocalTime(localTime.plus({ hours: 1 })),
    [localTime, setLocalTime]
  );
  const onBackClick = useCallback(
    () => setLocalTime(localTime.minus({ hours: 1 })),
    [localTime, setLocalTime]
  );
  const onNowClick = useCallback(
    () => setLocalTime(DateTime.local()),
    [setLocalTime]
  );

  return (
    <div className="absolute top-2 right-2 z-30 rounded p-2 shadow-lg">
      <div className="flex items-center">
        <button
          onClick={onBackClick}
          className={cx(buttonBaseClasses, backgroundColor)}
        >
          Geri
        </button>
        <p className="mx-2 text-xs">{localTime.toFormat("dd MMMM, HH:mm")}</p>
        <button
          onClick={onForwardClick}
          className={cx(buttonBaseClasses, backgroundColor)}
        >
          İleri
        </button>
      </div>
      <div className="w-full">
        <button
          onClick={onNowClick}
          className={cx(
            buttonBaseClasses,
            backgroundColor,
            "mt-2 flex w-full justify-center"
          )}
        >
          Şimdi
        </button>
      </div>
    </div>
  );
}
