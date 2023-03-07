import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import Head from "next/head";
import colors from "tailwindcss/colors";

const theme = {
  [TimeNames.Imsak]: "text-sky-900 bg-sky-50",
  [TimeNames.Gunes]: "text-orange-900 bg-orange-50",
  [TimeNames.Ogle]: "text-yellow-900 bg-yellow-50",
  [TimeNames.Ikindi]: "text-rose-900 bg-rose-50",
  [TimeNames.Aksam]: "text-blue-900 bg-blue-50",
  [TimeNames.Yatsi]: "text-indigo-900 bg-indigo-50",
};
const color = {
  [TimeNames.Imsak]: colors.sky,
  [TimeNames.Gunes]: colors.orange,
  [TimeNames.Ogle]: colors.yellow,
  [TimeNames.Ikindi]: colors.rose,
  [TimeNames.Aksam]: colors.blue,
  [TimeNames.Yatsi]: colors.indigo,
};

export default function Layout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { times } = useContext(CommonStoreContext);
  const now = times?.time?.now;
  const layoutStyle = now ? theme[now] : "";
  const themeColor = now ? color[now] : "";

  return (
    <div className={cx(className, layoutStyle)}>
      <Head>
        {themeColor && <meta name="theme-color" content={themeColor["50"]} />}
      </Head>
      {children}
    </div>
  );
}
