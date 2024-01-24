import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import TimeLocation from "@/components/tv/time-location";
import TimeSummary from "@/components/tv/time-summary";
import TimeTravel from "@/components/time-travel";
import Layout from "@/components/tv/layout";
import { TimeNames } from "@/lib/types";
import TimeListRow from "@/components/tv/list-row";

export default function Index() {
  const { times } = useContext(CommonStoreContext);

  if (!times) return null;

  return (
    <Layout>
      <div className="p-20 flex flex-col items-center">
        <TimeLocation />
        <TimeSummary />
      </div>
      <div className="w-full p-20 h-full">
        <div className="grid h-full">
          {Object.keys(TimeNames).map((key, index) => {
            return (
              <TimeListRow key={key} index={index} time={key as TimeNames} />
            );
          })}
        </div>
      </div>
      <TimeTravel />
    </Layout>
  );
}
