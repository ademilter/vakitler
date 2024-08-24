import { TimeFormat, TypeTimer } from "@/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";
import { HOUR_FORMAT, HOUR_FORMAT_12 } from "@/utils/const";

export function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function secondSplit(second: number): TypeTimer {
  return [
    Math.floor(second / 3600),
    Math.floor((second % 3600) / 60),
    Math.floor(second % 60),
  ];
}

export function adjustedTime(adjustment: number, time: string = "00:00") {
  const timeValue = DateTime.fromFormat(time, HOUR_FORMAT);
  const newTime = timeValue.plus({ minutes: adjustment });
  return newTime.toFormat(HOUR_FORMAT);
}

export function formattedTime(
  timeFormat: TimeFormat,
  baseTime: string = "00:00",
  locale?: string
) {
  return DateTime.fromFormat(baseTime, HOUR_FORMAT)
    .toFormat(timeFormat === "12" ? HOUR_FORMAT_12 : HOUR_FORMAT, { locale })
    .toLowerCase();
}

export function numberToTimezoneOffset(offset: number): string {
  const offsetHours = Math.floor(offset);
  const offsetMinutes = Math.round((offset - offsetHours) * 60);

  const sign = offset >= 0 ? "+" : "-";

  const hoursString = Math.abs(offsetHours).toString().padStart(2, "0");
  const minutesString = Math.abs(offsetMinutes).toString().padStart(2, "0");

  return `UTC${sign}${hoursString}:${minutesString}`;
}
