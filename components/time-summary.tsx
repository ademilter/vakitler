import { TimeNames } from "@/lib/types";
import { useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";
import Icon, { ICON_NAMES } from "@/components/icon";
import TimeSummaryTimer from "@/components/time-summary-timer";

export default function Timer() {
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
        y: 30,
        scale: 0.9,
        opacity: 0,
      },
    },
    transition: {
      delay: 0.3,
    },
  };

  return (
    <div className="flex items-center justify-center pb-12 pt-14">
      <motion.div {...containerAnim} className="flex flex-col items-center">
        <Icon icon={times?.iconName as keyof typeof ICON_NAMES} size={32} />

        <h2 className="mt-2 text-4xl capitalize">
          {t(`times${times?.time.now as TimeNames}`)}
        </h2>

        <div className="mt-4">
          <TimeSummaryTimer />
        </div>
      </motion.div>
    </div>
  );
}
