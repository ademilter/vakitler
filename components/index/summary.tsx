import { TimeNames } from "@/types";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import TimeSummaryTimer from "@/components/time-summary-timer";
import Container from "@/components/container";
import Trans from "next-translate/Trans";
import RamadanTimer from "@/components/ramadan-timer";
import IslamicDate from "@/components/islamic-date";

export default function TimeSummary() {
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);

  let timeName = t(times?.time.next as TimeNames);
  if (times?.today?.isJumuah && times?.time.next === TimeNames.Ogle) {
    timeName = t("Jumuah");
  }

  return (
    <motion.div {...containerAnim}>
      <Container className="flex h-full gap-1 flex-col items-center justify-center pt-16 pb-4">
        <span className="flex capitalize text-lg md:text-xl font-medium">
          <Trans
            ns={"common"}
            i18nKey="timerTitle"
            values={{
              time: timeName,
            }}
          />
        </span>

        <TimeSummaryTimer />

        <IslamicDate className="mt-2 opacity-80" />

        <div className="mt-3">
          <RamadanTimer />
        </div>
      </Container>
    </motion.div>
  );
}

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
