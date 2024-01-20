import { TimeFormat, TypeTimer } from "@/lib/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";
import { HOUR_FORMAT, HOUR_FORMAT_12 } from "@/lib/const";

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

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

export async function askNotificationPermission(
  callback?: (status: NotificationPermission) => void
) {
  function handlePermission(permission: NotificationPermission) {
    callback && callback(permission);
  }

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else if (checkNotificationPromise()) {
    Notification.requestPermission().then(permission => {
      handlePermission(permission);
    });
  } else {
    Notification.requestPermission(permission => {
      handlePermission(permission);
    });
  }
}

export function notify(text: string) {
  askNotificationPermission(() => {
    const notification = new Notification("Namaz Vakitleri", {
      body: text,
      badge: "/icons-512.png",
      icon: "/icons-512.png",
    });

    notification.addEventListener("click", () => {
      window.open(location.href, "_self");
    });
  });
}

export function checkForNotification(
  text: string,
  timer: number[],
  whenByMin = 45
) {
  const notified = localStorage.getItem("notified");
  if (!timer[0] && timer[1] <= whenByMin && !notified) {
    localStorage.setItem("notified", "true");
    notify(text);
  } else if (!timer[0] && !timer[1] && !timer[2]) {
    localStorage.removeItem("notified");
  }
}
