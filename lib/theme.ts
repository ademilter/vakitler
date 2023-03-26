import colors from "tailwindcss/colors";
import { TimeNames } from "@/lib/types";

export const theme = {
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

export const color = {
  [TimeNames.Imsak]: [colors.sky["50"], "#15222c"],
  [TimeNames.Gunes]: [colors.orange["50"], "#2c1c1a"],
  [TimeNames.Ogle]: [colors.yellow["50"], "#2a201a"],
  [TimeNames.Ikindi]: [colors.rose["50"], "#2e1721"],
  [TimeNames.Aksam]: [colors.blue["50"], "#191f32"],
  [TimeNames.Yatsi]: [colors.indigo["50"], "#1d1c30"],
};
