import { cx } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import useLocations from "@/hooks/use-locations";

export default function IndexLocation() {
  const { lang } = useTranslation("common");
  const { city } = useLocations();

  return (
    <motion.div
      {...containerAnim}
      className={cx(
        "absolute inset-x-0 top-0 z-20",
        "flex items-center justify-center py-4 md:py-6"
      )}
    >
      <div
        className="relative px-4 py-1 inline-flex items-center
        tracking-wider font-medium gap-px text-sm uppercase"
      >
        <Link className="" href="/settings">
          <span className="absolute inset-0 -z-10 bg-current opacity-10 rounded-3xl" />

          <span className="opacity-80">{city?.toLocaleLowerCase(lang)}</span>
          {/*<span className="">{city?.toLocaleLowerCase(lang)}</span>*/}
        </Link>
      </div>
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
      y: 20,
      scale: 0.8,
      opacity: 0,
    },
  },
  transition: {
    delay: 0.4,
  },
};
