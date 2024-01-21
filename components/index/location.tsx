import { cx } from "@/lib/utils";
import TimeLocation from "@/components/time-location";
import { motion } from "framer-motion";

export default function IndexLocation() {
  const containerAnim = {
    variants: {
      open: {
        y: 0,
        scale: 1,
        opacity: 1,
      },
      closed: {
        y: 20,
        scale: 0.8,
        opacity: 0,
      },
    },
    transition: {
      delay: 0.4,
    },
  };

  return (
    <motion.div
      {...containerAnim}
      className={cx(
        "absolute inset-x-0 top-0 z-20",
        "flex items-center justify-center py-4 md:py-6"
      )}
    >
      <TimeLocation />
    </motion.div>
  );
}
