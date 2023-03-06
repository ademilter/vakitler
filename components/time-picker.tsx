import React, { useCallback, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";

export default function TimePicker() {
  const { localTime, devLocalTime, setDevLocalTime, fetchData } =
    useContext(CommonStoreContext);

  const onNowClick = useCallback(() => {
    setDevLocalTime([0, 0, 0]);
  }, [setDevLocalTime]);

  return (
    <div className="fixed top-0 right-0 z-30 rounded p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="w-10"
          value={devLocalTime[0]}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setDevLocalTime([value, devLocalTime[1], devLocalTime[2]]);
            }
          }}
        />
        <input
          type="number"
          className="w-10"
          value={devLocalTime[1]}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setDevLocalTime([devLocalTime[0], value, devLocalTime[2]]);
            }
          }}
        />
        <input
          type="number"
          className="w-10"
          value={devLocalTime[2]}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setDevLocalTime([devLocalTime[0], devLocalTime[1], value]);
            }
          }}
        />
        <button onClick={onNowClick}>Clear</button>
      </div>
    </div>
  );
}
