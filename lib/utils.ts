import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TimeNames } from "@/lib/types";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function secondSplit(second: number): [string, string, string] {
  let pad = (x: number): string => {
    return x < 10 ? `0${x}` : `${x}`;
  };
  return [
    pad(Math.floor(second / 3600)),
    pad(Math.floor((second % 3600) / 60)),
    pad(Math.floor(second % 60)),
  ];
}

export const hourFormat = "HH:mm";

export const themeTimes = {
  [TimeNames.Fajr]: "text-sky-900 grid-rows-[2fr,_1fr,_1fr,_1fr,_1fr,_1fr]",
  [TimeNames.Sunrise]:
    "text-orange-900 grid-rows-[1fr,_2fr,_1fr,_1fr,_1fr,_1fr]",
  [TimeNames.Dhuhr]: "text-yellow-900 grid-rows-[1fr,_1fr,_2fr,_1fr,_1fr,_1fr]",
  [TimeNames.Asr]: "text-amber-900 grid-rows-[1fr,_1fr,_1fr,_2fr,_1fr,_1fr]",
  [TimeNames.Maghrib]: "text-blue-900 grid-rows-[1fr,_1fr,_1fr,_1fr,_2fr,_1fr]",
  [TimeNames.Isha]: "text-indigo-900 grid-rows-[1fr,_1fr,_1fr,_1fr,_1fr,_2fr]",
};

export const themeTime = {
  [TimeNames.Fajr]: {
    [TimeNames.Fajr]: "bg-sky-400/0",
    [TimeNames.Sunrise]: "bg-sky-400/10",
    [TimeNames.Dhuhr]: "bg-sky-400/20",
    [TimeNames.Asr]: "bg-sky-400/30",
    [TimeNames.Maghrib]: "bg-sky-400/40",
    [TimeNames.Isha]: "bg-sky-400/50",
  },
  [TimeNames.Sunrise]: {
    [TimeNames.Fajr]: "bg-orange-400/10",
    [TimeNames.Sunrise]: "bg-orange-400/0",
    [TimeNames.Dhuhr]: "bg-orange-400/10",
    [TimeNames.Asr]: "bg-orange-400/20",
    [TimeNames.Maghrib]: "bg-orange-400/30",
    [TimeNames.Isha]: "bg-orange-400/40",
  },
  [TimeNames.Dhuhr]: {
    [TimeNames.Fajr]: "bg-yellow-400/20",
    [TimeNames.Sunrise]: "bg-yellow-400/10",
    [TimeNames.Dhuhr]: "bg-yellow-400/0",
    [TimeNames.Asr]: "bg-yellow-400/10",
    [TimeNames.Maghrib]: "bg-yellow-400/20",
    [TimeNames.Isha]: "bg-yellow-400/30",
  },
  [TimeNames.Asr]: {
    [TimeNames.Fajr]: "bg-amber-400/30",
    [TimeNames.Sunrise]: "bg-amber-400/20",
    [TimeNames.Dhuhr]: "bg-amber-400/10",
    [TimeNames.Asr]: "bg-amber-400/0",
    [TimeNames.Maghrib]: "bg-amber-400/10",
    [TimeNames.Isha]: "bg-amber-400/20",
  },
  [TimeNames.Maghrib]: {
    [TimeNames.Fajr]: "bg-blue-400/40",
    [TimeNames.Sunrise]: "bg-blue-400/30",
    [TimeNames.Dhuhr]: "bg-blue-400/20",
    [TimeNames.Asr]: "bg-blue-400/10",
    [TimeNames.Maghrib]: "bg-blue-400/0",
    [TimeNames.Isha]: "bg-blue-400/10",
  },
  [TimeNames.Isha]: {
    [TimeNames.Fajr]: "bg-indigo-500/50",
    [TimeNames.Sunrise]: "bg-indigo-500/40",
    [TimeNames.Dhuhr]: "bg-indigo-500/30",
    [TimeNames.Asr]: "bg-indigo-500/20",
    [TimeNames.Maghrib]: "bg-indigo-500/10",
    [TimeNames.Isha]: "bg-indigo-500/0",
  },
};
