"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import { TimeNames } from "@/lib/types";

export default function List() {
  const { fetchData, loading, times } = store();

  useEffect(() => {
    fetchData();
  }, []);

  // useInterval(timer, time ? 1000 : null);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {times && (
            <div>
              <div>
                <div>{times.time.now}</div>
                <div>{times.time.next}</div>
                <div>{times.timer.join(":")}</div>
              </div>

              <div className="grid h-screen">
                {Object.keys(times.today).map((key) => {
                  const time = times.today[key as TimeNames];
                  return (
                    <div className="bg-blue-50 px-6" key={key}>
                      <div className="mx-auto flex h-full max-w-screen-sm items-center">
                        <div>
                          {times.time.now === key && (
                            <div className="h-4 w-4 rounded-full bg-red-500">
                              now
                            </div>
                          )}
                          <h4 className="">{key}</h4>
                          <h4 className="text-xl font-bold">{time}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="fixed inset-x-0 bottom-0 grid place-items-center">
                <div className="flex items-center justify-center gap-4 rounded-full bg-white p-4 shadow-xl">
                  <button type="button">An</button>
                  <button type="button">Liste</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
