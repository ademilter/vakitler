import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import TimeTravel from "@/components/time-travel";
import IndexLayout from "@/components/index/layout";
import IndexSummary from "@/components/index/summary";
import IndexLocation from "@/components/index/location";
import IndexTimeList from "@/components/index/list";

export default function Index() {
  const { times } = useContext(CommonStoreContext);

  if (!times) return null;

  return (
    <IndexLayout>
      <IndexLocation />
      <IndexSummary />
      <IndexTimeList />
      <TimeTravel />
    </IndexLayout>
  );
}
