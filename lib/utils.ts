import { TypeTimer } from "@/lib/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";
import { hourFormat, hourFormat12 } from "@/lib/const";

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

export function adjustedTime(time: string = "00:00", adjustment: number) {
  const timeValue = DateTime.fromFormat(time, hourFormat);
  const newTime = timeValue.plus({ minutes: adjustment });
  return newTime.toFormat(hourFormat);
}

export function formattedTime(
  baseTime: string = "00:00",
  timeFormat: "12" | "24"
) {
  return DateTime.fromFormat(baseTime, hourFormat)
    .toFormat(timeFormat === "12" ? hourFormat12 : hourFormat)
    .toLowerCase();
}
