import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
