import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import TimeList from "@/components/time-list";
import TimeTravel from "@/components/time-travel";
import MainPage from "@/components/layout/main";
import IndexSummary from "@/components/index/summary";
import IndexLocation from "@/components/index/location";

export default function Index() {
  const { times } = useContext(CommonStoreContext);

  if (!times) return null;

  return (
    <MainPage>
      <IndexLocation />
      <IndexSummary />
      <TimeList />
      <TimeTravel />
    </MainPage>
  );
}
