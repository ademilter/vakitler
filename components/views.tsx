"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import ViewTimes from "@/components/view-times";
import ViewTimer from "@/components/view-timer";

export default function Views() {
  const { fetchData, loading, times } = store();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {times && (
            <div>
              <ViewTimer />
              <ViewTimes />

              <div className="fixed inset-x-0 bottom-0 grid place-items-center">
                <div className="flex items-center justify-center gap-4 rounded-full bg-white p-4 shadow-xl">
                  <button type="button">An</button>
                  <button type="button">Liste</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
