import { cx } from "@/utils/helper";
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
      className={cx("absolute inset-x-0 text-center top-4 md:top-6 z-20")}
    >
      <Link
        className="relative px-4 py-1.5 inline-flex items-center gap-2
        tracking-wider font-medium text-sm uppercase"
        href="/settings"
      >
        <span className="absolute inset-0 -z-10 bg-white dark:bg-white/10 rounded-3xl" />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 24 24"
          strokeWidth="1.4"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M4 6l8 0" />
          <path d="M16 6l4 0" />
          <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M4 12l2 0" />
          <path d="M10 12l10 0" />
          <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M4 18l11 0" />
          <path d="M19 18l1 0" />
        </svg>
        <span>{city?.toLocaleLowerCase(lang)}</span>
        {/*<span className="">{city?.toLocaleLowerCase(lang)}</span>*/}
      </Link>
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
