import { TimeNames } from "@/lib/types";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import TimeSummaryTimer from "@/components/time-summary-timer";
import TimeSummaryIcon from "@/components/time-summary-icon";

export default function TimeSummary() {
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);

  const containerAnim = {
    variants: {
      open: {
        y: 0,
        scale: 1,
        opacity: 1,
      },
      closed: {
        y: 60,
        scale: 0.8,
        opacity: 0,
      },
    },
    transition: {
      delay: 0.3,
    },
  };

  return (
    <motion.div
      {...containerAnim}
      className="flex w-full flex-col items-center justify-center pb-12 pt-14"
    >
      <TimeSummaryIcon />

      <h2 className="mt-2 text-4xl capitalize md:mt-4 md:text-5xl">
        {t(`times${times?.time.now as TimeNames}`)}
      </h2>

      <div className="mt-5 md:mt-6">
        <TimeSummaryTimer />
      </div>
    </motion.div>
  );
}
