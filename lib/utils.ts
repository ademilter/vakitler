import { TypeTimer } from "@/lib/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

export function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function secondSplit(second: number): TypeTimer {
  let pad = (x: number): string => {
    return x < 10 ? `0${x}` : `${x}`;
  };

  return [
    Math.floor(second / 3600),
    Math.floor((second % 3600) / 60),
    Math.floor(second % 60),
  ];
}

export function adjustedTime(baseTime: string = "00:00", adjustment: number, timeFormat: "12" | "24") {
  const time = DateTime.fromFormat(baseTime, "HH:mm");
  const newTime = time.plus({ minutes: adjustment });
  return newTime.toFormat(timeFormat === "12" ? "hh:mm a" : "HH:mm").toLowerCase();
}
