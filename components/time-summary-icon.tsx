import { useContext, useEffect, useState } from "react";
import { CommonStoreContext } from "@/stores/common";
import useTranslation from "next-translate/useTranslation";
import Icon, { ICON_NAMES } from "@/components/icon";
import { motion } from "framer-motion";

export default function TimeSummaryIcon() {
  const { t } = useTranslation("common");

  const { times } = useContext(CommonStoreContext);
  const hijriMonths = [
    "Muharrem",
    "Safer",
    "Rebiulevvel",
    "Rebiulahir",
    "Cemaziyelevvel",
    "Cemaziyelahir",
    "Recep",
    "Saban",
    "Ramazan",
    "Sevval",
    "Zilkade",
  ];

  const [showHijriCalendar, setShowHijriCalendar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHijriCalendar(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!times || !times?.today) return null;

  const hijriDate = times?.hijriDate;
  const formattedHijriDate = `${hijriDate.hd} ${t(
    hijriMonths[hijriDate.hm - 1]
  )} ${hijriDate.hy}`;

  return (
    <motion.button
      type="button"
      className="flex w-full items-center justify-center"
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
        {formattedHijriDate}
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
        <Icon
          icon={times?.iconName as keyof typeof ICON_NAMES}
          size="1em"
          // size için font-size kullanıyoruz
          className={`text-[44px] md:text-[60px]`}
        />
      </motion.span>
    </motion.button>
  );
}
