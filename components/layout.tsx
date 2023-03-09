import { ReactNode, useContext } from "react";
import { cx } from "@/lib/utils";
import { TimeNames } from "@/lib/types";
import { CommonStoreContext } from "@/stores/common";
import colors from "tailwindcss/colors";
import Div100vh from "react-div-100vh";

const theme = {
  [TimeNames.Imsak]: "text-sky-900",
  [TimeNames.Gunes]: "text-orange-900",
  [TimeNames.Ogle]: "text-yellow-900",
  [TimeNames.Ikindi]: "text-rose-900",
  [TimeNames.Aksam]: "text-blue-900",
  [TimeNames.Yatsi]: "text-indigo-900",
};

const color = {
  [TimeNames.Imsak]: colors.sky["50"],
  [TimeNames.Gunes]: colors.orange["50"],
  [TimeNames.Ogle]: colors.yellow["50"],
  [TimeNames.Ikindi]: colors.rose["50"],
  [TimeNames.Aksam]: colors.blue["50"],
  [TimeNames.Yatsi]: colors.indigo["50"],
};

export default function Layout({ children }: { children: ReactNode }) {
  const { times } = useContext(CommonStoreContext);

  const now = times?.time?.now;
  const themeStyle = now ? theme[now] : "";

  return <Div100vh className={cx(themeStyle, "relative")}>{children}</Div100vh>;
}
