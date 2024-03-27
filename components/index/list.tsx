import { motion } from "framer-motion";
import { TimeNames } from "@/types";
import Time from "@/components/index/list-row";
import TimeListRowBottom from "@/components/index/list-row-last";

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
      {Object.keys(TimeNames).map((time, index) => {
        return <Time key={time} index={index} time={time as TimeNames} />;
      })}
      <TimeListRowBottom />
    </motion.div>
  );
}
