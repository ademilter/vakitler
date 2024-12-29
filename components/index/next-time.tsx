import { TimeNames } from "utils/types";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
import { cx } from "utils/helper";
import { useStore } from "stores/global";
import { motion } from "framer-motion";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function NextTime({ className }: Props) {
  const { t } = useTranslation("common");
  const { times } = useStore(store => ({
    times: store.times,
  }));

  let timeName = t(times?.time.next as TimeNames);

  if (times?.today?.isJumuah && times?.time.next === TimeNames.Ogle) {
    timeName = t("Jumuah");
  }

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      // animate={{ y: 0, opacity: 1 }}
      // exit={{ y: -40, opacity: 0 }}
      className={cx("uppercase font-medium tracking-wide", className)}
    >
      <Trans
        ns={"common"}
        i18nKey="timerTitle"
        values={{
          time: timeName,
        }}
      />
    </motion.div>
  );
}