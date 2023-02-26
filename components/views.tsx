"use client";

import { useEffect } from "react";
import store from "@/stores/list";
import ViewTimes from "@/components/view-times";

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
        <div className="h-screen">
          <ViewTimes />
        </div>
      )}
    </div>
  );
}
