import { motion } from "framer-motion";
import { TimeNames } from "@/lib/types";
import Time from "@/components/time-list-row";

export default function TimeList() {
  return (
    <motion.div
      className="grid h-full"
      variants={{
        open: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
            staggerDirection: -1,
          },
        },
      }}
    >
      {Object.keys(TimeNames).map((key, index) => {
        return <Time key={key} index={index} time={key as TimeNames} />;
      })}
    </motion.div>
  );
}
