import React, { useCallback, useContext, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";

const shouldShowTimePicker = process.env.NODE_ENV !== "production";

export default function TimeTravel() {
  const { devLocalTime, setDevLocalTime } = useContext(CommonStoreContext);

  const [show, setShow] = useState(false);

  const onNowClick = useCallback(() => {
    setDevLocalTime([0, 0, 0]);
  }, [setDevLocalTime]);

  if (!shouldShowTimePicker) return null;

  return (
    <div
      className={cx(
        "transform-x fixed bottom-2 right-2 z-30",
        show ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div
        className={cx("flex items-center gap-2 rounded-lg bg-white px-3 py-2")}
      >
        <button
          className="-ml-3 flex h-8 w-3 rounded-lg"
          onClick={() => {
            setShow(!show);
          }}
        />

        <input
          type="number"
          className="h-8 w-12 rounded-lg bg-zinc-100 pl-2"
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
          className="h-8 w-12 rounded-lg bg-zinc-100 pl-2"
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
          className="h-8 w-12 rounded-lg bg-zinc-100 pl-2"
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
