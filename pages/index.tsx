import { useEffect, useState } from "react";
import Head from "next/head";
import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import TimeLocation from "@/components/time-location";
import TimeSummary from "@/components/time-summary";
import TimeList from "@/components/time-list";
import TimeTravel from "@/components/time-travel";
import MainPage from "@/components/layout/main";
import { metadata } from "@/lib/meta";
import useInitApp from "@/hooks/use-init-app";
import { useTimes, useThemeColour } from "@/stores";

export default function Index() {
  const [start, setStart] = useState(false);
  const times = useTimes();

  const [initApp] = useInitApp();

  useEffect(() => {
    if (!times) return;
    setStart(true);
  }, [times]);

  useEffect(() => {
    initApp();
  }, []);

  if (!times) return null;

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <MainPage>
        <motion.div
          initial={false}
          animate={start ? "open" : "closed"}
          className={cx(
            "h-full select-none",
            "grid grid-rows-[minmax(auto,_1fr)_minmax(auto,_480px)]",
            "md:grid-rows-[minmax(auto,_1fr)_minmax(auto,_520px)]"
          )}
        >
          <TimeLocation />
          <TimeSummary />
          <TimeList />
          <TimeTravel />
        </motion.div>
      </MainPage>
    </>
  );
}
