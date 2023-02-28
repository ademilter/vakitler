import { Timer } from "@/lib/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function secondSplit(second: number): Timer {
  let pad = (x: number): string => {
    return x < 10 ? `0${x}` : `${x}`;
  };

  return [
    Math.floor(second / 3600),
    Math.floor((second % 3600) / 60),
    Math.floor(second % 60),
  ];
}
