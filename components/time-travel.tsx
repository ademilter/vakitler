import React, { useCallback, useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import { cx } from "@/lib/utils";

const shouldShowTimePicker = process.env.NODE_ENV !== "production";

type TimeTravels = [number, number, number];

export default function TimeTravel() {
  const { times } = useContext(CommonStoreContext);
  const [timeTravel, setTimeTravel] = useState<TimeTravels>(
    times?.timeTravel || [0, 0, 0]
  );

  useEffect(() => {
    times?.updateTimeTravel(timeTravel);
  }, [times, timeTravel]);

  const [show, setShow] = useState(false);

  const onNowClick = useCallback(() => {
    setTimeTravel([0, 0, 0]);
  }, []);

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

        {timeTravel.map((value, index) => {
          return (
            <input
              key={index}
              type="number"
              className="h-8 w-12 rounded-lg bg-zinc-100 pl-2"
              value={timeTravel[index]}
              onChange={e => {
                const value = parseInt(e.target.value);
                const newTimeTravel = [...timeTravel] as TimeTravels;
                newTimeTravel[index] = value;
                if (isNaN(value)) {
                  return;
                }

                setTimeTravel(newTimeTravel);
              }}
            />
          );
        })}
        <button onClick={onNowClick}>Clear</button>
      </div>
    </div>
  );
}
