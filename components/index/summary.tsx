import { motion } from "framer-motion";
import TimeSummary from "@/components/time-summary";

export default function IndexSummary() {
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
    <motion.div {...containerAnim} className="grid place-items-center pt-10">
      <TimeSummary />
    </motion.div>
  );
}
