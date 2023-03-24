import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";

const theme = {
  [TimeNames.Imsak]: "bg-sky-50 text-sky-900 dark:text-sky-50 dark:bg-sky-900",
  [TimeNames.Gunes]:
    "bg-orange-50 text-orange-900 dark:text-orange-50 dark:bg-orange-900",
  [TimeNames.Ogle]:
    "bg-yellow-50 text-yellow-900 dark:text-yellow-50 dark:bg-yellow-900",
  [TimeNames.Ikindi]:
    "bg-rose-50 text-rose-900 dark:text-rose-50 dark:bg-rose-900",
  [TimeNames.Aksam]:
    "bg-blue-50 text-blue-900 dark:text-blue-50 dark:bg-blue-900",
  [TimeNames.Yatsi]:
    "bg-indigo-50 text-indigo-900 dark:text-indigo-50 dark:bg-indigo-900",
};

export default function Layout({ children }: { children: ReactNode }) {
  const { times } = useContext(CommonStoreContext);

  const now = times?.time?.now;
  const themeStyle = now ? theme[now] : "";

  return (
    <div className={cx(themeStyle, "min-h-screen dark:bg-opacity-40")}>
      {children}
    </div>
  );
}
