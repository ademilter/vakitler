import {DateTime, Interval, Settings} from "luxon";
import { AllTimes, DayTimes, TimeNames } from "@/lib/types";
import { secondSplit } from "@/lib/utils";
import { hourFormat } from "@/lib/const";

export class Time {
  public [TimeNames.Fajr]: string;
  public [TimeNames.Sunrise]: string;
  public [TimeNames.Dhuhr]: string;
  public [TimeNames.Asr]: string;
  public [TimeNames.Maghrib]: string;
  public [TimeNames.Isha]: string;

  constructor(times: DayTimes) {
    this[TimeNames.Fajr] = times[0];
    this[TimeNames.Sunrise] = times[1];
    this[TimeNames.Dhuhr] = times[2];
    this[TimeNames.Asr] = times[3];
    this[TimeNames.Maghrib] = times[4];
    this[TimeNames.Isha] = times[5];
  }
}

export class Times {
  public times: {
    [key: string]: Time;
  };

  constructor(times: AllTimes) {
    this.times = {};

    Object.keys(times).map((day) => {
      this.add(day, times[day]);
    });
  }

  public add(date: string, times: DayTimes): void {
    const time = new Time(times);
    this.times[date] = time;
  }

  get today(): Time {
    const date = DateTime.local().toISODate();
    return this.times[date];
  }

  get tomorrow() {
    const date = DateTime.local().plus({ days: 1 }).toISODate();
    return this.times[date];
  }

  get time(): { now: TimeNames; next: TimeNames } {
    const fajr = DateTime.fromFormat(this.today[TimeNames.Fajr], hourFormat);
    const sun = DateTime.fromFormat(this.today[TimeNames.Sunrise], hourFormat);
    const dhuhr = DateTime.fromFormat(this.today[TimeNames.Dhuhr], hourFormat);
    const asr = DateTime.fromFormat(this.today[TimeNames.Asr], hourFormat);
    const maghrib = DateTime.fromFormat(
      this.today[TimeNames.Maghrib],
      hourFormat
    );
    const isha = DateTime.fromFormat(this.today[TimeNames.Isha], hourFormat);

    // default values = Isha
    const obj: { now: TimeNames; next: TimeNames } = {
      now: TimeNames.Isha,
      next: TimeNames.Fajr,
    };

    const datetime = DateTime.local();

    if (Interval.fromDateTimes(fajr, sun).contains(datetime)) {
      obj.now = TimeNames.Fajr;
      obj.next = TimeNames.Sunrise;
    } //
    else if (Interval.fromDateTimes(sun, dhuhr).contains(datetime)) {
      obj.now = TimeNames.Sunrise;
      obj.next = TimeNames.Dhuhr;
    } //
    else if (Interval.fromDateTimes(dhuhr, asr).contains(datetime)) {
      obj.now = TimeNames.Dhuhr;
      obj.next = TimeNames.Asr;
    } //
    else if (Interval.fromDateTimes(asr, maghrib).contains(datetime)) {
      obj.now = TimeNames.Asr;
      obj.next = TimeNames.Maghrib;
    } //
    else if (Interval.fromDateTimes(maghrib, isha).contains(datetime)) {
      obj.now = TimeNames.Maghrib;
      obj.next = TimeNames.Isha;
    }

    return obj;
  }

  get timer(): [number, number, number] {
    let dateTime = DateTime.fromFormat(this.today[this.time.next], "HH:mm");

    if (this.time.next === TimeNames.Fajr) {
      dateTime = DateTime.fromFormat(this.today[TimeNames.Fajr], "HH:mm");

      const isBeforeMidnight =
        DateTime.local() >
        DateTime.fromFormat(this.today[TimeNames.Fajr], "HH:mm");

      if (isBeforeMidnight) {
        dateTime = DateTime.fromFormat(
          this.tomorrow[TimeNames.Fajr],
          "HH:mm"
        ).plus({ days: 1 });
      }
    }

    const ms = dateTime.diffNow().toMillis();

    return secondSplit(ms / 1000);
  }
}
