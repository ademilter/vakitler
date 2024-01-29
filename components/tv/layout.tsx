import { ReactNode, useContext } from "react";
import { cx } from "@/utils/helper";
import { TimeNames } from "@/types";
import { CommonStoreContext } from "@/stores/common";

const theme = {
  [TimeNames.Imsak]: "bg-sky-300/30 text-sky-800",
  [TimeNames.Gunes]: "bg-orange-300/30 text-orange-800",
  [TimeNames.Ogle]: "bg-yellow-300/30 text-yellow-800",
  [TimeNames.Ikindi]: "bg-rose-300/30 text-rose-800",
  [TimeNames.Aksam]: "bg-blue-300/30 text-blue-800",
  [TimeNames.Yatsi]: "bg-indigo-300/30 text-indigo-800",
};

export default function MainPage({ children }: { children: ReactNode }) {
  const { times } = useContext(CommonStoreContext);

  const now: TimeNames = times!.time?.now;
  const themeStyle = now ? theme[now] : "";

  return (
    <div className={cx("fixed inset-0 bg-white")}>
      <div
        className={cx(
          themeStyle,
          "h-full bg-gradient-to-b from-blue-100 to-blue-300 grid grid-cols-2 place-items-center"
        )}
      >
        {children}
      </div>
    </div>
  );
}
