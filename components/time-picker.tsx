import React, { useCallback, useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { CommonStoreContext } from "@/stores/common";

export default function TimePicker() {
  const { localTime, setLocalTime, fetchData } = useContext(CommonStoreContext);

  const [time, setTime] = useState<string>(localTime.toFormat("HH:mm"));

  useEffect(() => {
    const rawSettings = localStorage.getItem("VAKITLER_SETTINGS");
    const settings = JSON.parse(rawSettings ?? "{}");
    if (settings.city.IlceID) fetchData(settings.city.IlceID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTime]);

  const onSetTime = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTime(value);
      const time = DateTime.fromFormat(value, "HH:mm");
      setLocalTime(time);
    },
    [localTime, setLocalTime]
  );

  const onNowClick = useCallback(() => {
    setTime(DateTime.local().toFormat("HH:mm"));
    setLocalTime(DateTime.local());
  }, [setLocalTime]);

  return (
    <div className="fixed top-0 right-0 z-30 rounded p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <input type="time" value={time} onChange={onSetTime} />
        <button onClick={onNowClick}>Clear</button>
      </div>
    </div>
  );
}
