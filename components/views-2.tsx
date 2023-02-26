"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import ViewTimes from "@/components/view-times";
import ViewTimer from "@/components/view-timer";
import { ViewNames } from "@/lib/types";
import { cx } from "@/lib/utils";

export default function Views() {
  const { fetchData, loading, times, view, setView } = store();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-screen pb-32">
          {view === ViewNames.Timer && <ViewTimer />}
          {view === ViewNames.Times && <ViewTimes />}

          <div className="fixed inset-x-0 bottom-10 grid h-24 place-items-center">
            <div className="flex h-12 items-center justify-center rounded-full bg-white p-1 shadow">
              {Object.keys(ViewNames).map((key) => {
                const active =
                  view === ViewNames[key as keyof typeof ViewNames];
                return (
                  <button
                    key={key}
                    type="button"
                    className={cx(
                      "h-full rounded-full px-4",
                      active && "bg-gray-200"
                    )}
                    onClick={() =>
                      setView(ViewNames[key as keyof typeof ViewNames])
                    }
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
