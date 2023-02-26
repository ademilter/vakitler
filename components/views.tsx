"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import ViewTimes from "@/components/view-times";
import useInterval from "@/lib/use-interval";

export default function Views() {
  const { fetchData, loading, times, updateTimer } = store();

  useEffect(() => {
    fetchData();
  }, []);

  useInterval(updateTimer, times?.time ? 1000 : null);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-screen">
          <ViewTimes />
        </div>
      )}
    </div>
  );
}
