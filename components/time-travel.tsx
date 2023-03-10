import React, { useCallback, useContext, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";

const shouldShowTimePicker = process.env.NODE_ENV !== "production";

export default function TimeTravel() {
  const { times } = useContext(CommonStoreContext);
  const timeTravel = times?.timeTravel || [0, 0, 0];

  const [show, setShow] = useState(false);

  const onNowClick = useCallback(() => {
    times?.updateTimeTravel([0, 0, 0]);
  }, [times]);

  if (!times) return null;
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
          defaultValue={timeTravel[0]}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              times.updateTimeTravel([value, timeTravel[1], timeTravel[2]]);
            }
          }}
        />
        <input
          type="number"
          className="h-8 w-12 rounded-lg bg-zinc-100 pl-2"
          defaultValue={timeTravel[1]}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              times.updateTimeTravel([timeTravel[0], value, timeTravel[2]]);
            }
          }}
        />
        <input
          type="number"
          className="h-8 w-12 rounded-lg bg-zinc-100 pl-2"
          defaultValue={timeTravel[2]}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              times.updateTimeTravel([timeTravel[0], timeTravel[1], value]);
            }
          }}
        />
        <button onClick={onNowClick}>Clear</button>
      </div>
    </div>
  );
}
