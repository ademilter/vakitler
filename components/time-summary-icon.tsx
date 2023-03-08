import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import Icon, { ICON_NAMES } from "@/components/icon";
import { motion } from "framer-motion";
import { DateTime } from "luxon";

export default function TimeSummaryIcon() {
  const { lang } = useTranslation("common");

  const { times, localTime } = useContext(CommonStoreContext);
  const [showHijriCalendar, setShowHijriCalendar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHijriCalendar(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.button
      type="button"
      className="flex items-center justify-center"
      onClick={() => setShowHijriCalendar(!showHijriCalendar)}
      animate={showHijriCalendar ? "open" : "closed"}
    >
      <motion.span
        className="absolute"
        variants={{
          open: {
            y: 0,
            opacity: 1,
          },
          closed: {
            y: 10,
            opacity: 0,
          },
        }}
      >
        {localTime
          .reconfigure({ outputCalendar: "islamic" })
          .toLocaleString(DateTime.DATE_FULL, { locale: lang })}
      </motion.span>

      <motion.span
        variants={{
          close: {
            y: 0,
            opacity: 1,
          },
          open: {
            y: 10,
            opacity: 0,
          },
        }}
      >
        <Icon icon={times?.iconName as keyof typeof ICON_NAMES} size={32} />
      </motion.span>
    </motion.button>
  );
}
