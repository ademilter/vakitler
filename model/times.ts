import { DateTime, Interval, Settings } from "luxon";
import { ITime, TimeNames, TypeTimer } from "@/types";
import { secondSplit, numberToTimezoneOffset } from "@/utils/helper";
import { HOUR_FORMAT } from "@/utils/const";
import { Time } from "./time";

const timeNames = Object.values(TimeNames);

export class Times {
  public times: Time[];
  public localTime: DateTime;
  public timeTravel: [number, number, number];
  public adjustments: number[];

  constructor(
    data: ITime[] = [],
    adjustments: number[] = timeNames.map(() => 0)
  ) {
    this.adjustments = adjustments;
    const timeZone = data[0].GreenwichOrtalamaZamani;
    Settings.defaultZone = numberToTimezoneOffset(timeZone);
    this.times = data.map(day => new Time(day));
    this.localTime = DateTime.local();
    this.timeTravel = [0, 0, 0];
    if (adjustments.some(a => a !== 0)) {
      this.adjustTimes(adjustments);
    }
  }

  adjustTimes(adjustments: number[]) {
    this.times.forEach((day, index) => {
      timeNames.forEach((time, i) => {
        const timeValue = DateTime.fromFormat(day[time], HOUR_FORMAT);
        const newTime = timeValue.plus({ minutes: adjustments[i] });
        day[time] = newTime.toFormat(HOUR_FORMAT);
      });
    });
  }

  updateTimeTravel(value: [number, number, number]): void {
    this.timeTravel = value;
  }

  updateDateTime(datetime: DateTime): void {
    this.localTime = datetime;
  }

  get today(): undefined | Time {
    return this.times.find(o => {
      const day = this.localTime.toFormat("dd.MM.yyyy");
      return o.MiladiTarihKisa === day;
    });
  }

  get tomorrow(): undefined | Time {
    return this.times.find(o => {
      const day = this.localTime.plus({ days: 1 }).toFormat("dd.MM.yyyy");
      return o.MiladiTarihKisa === day;
    });
  }

  get yesterday(): undefined | Time {
    return this.times.find(o => {
      const day = this.localTime.minus({ days: 1 }).toFormat("dd.MM.yyyy");
      return o.MiladiTarihKisa === day;
    });
  }

  get time(): { now: TimeNames; next: TimeNames } {
    // TODO: check if today is undefined
    if (!this.today) return { now: TimeNames.Imsak, next: TimeNames.Imsak };

    const Imsak = DateTime.fromFormat(this.today[TimeNames.Imsak], HOUR_FORMAT);
    const Gunes = DateTime.fromFormat(this.today[TimeNames.Gunes], HOUR_FORMAT);
    const Ogle = DateTime.fromFormat(this.today[TimeNames.Ogle], HOUR_FORMAT);
    const Ikindi = DateTime.fromFormat(this.today[TimeNames.Ikindi], HOUR_FORMAT);
    const Aksam = DateTime.fromFormat(this.today[TimeNames.Aksam], HOUR_FORMAT);
    const Yatsi = DateTime.fromFormat(this.today[TimeNames.Yatsi], HOUR_FORMAT);

    // default values = Isha
    const obj: { now: TimeNames; next: TimeNames } = {
      now: TimeNames.Yatsi,
      next: TimeNames.Imsak,
    };

    if (Interval.fromDateTimes(Imsak, Gunes).contains(this.localTime)) {
      obj.now = TimeNames.Imsak;
      obj.next = TimeNames.Gunes;
    } //
    else if (Interval.fromDateTimes(Gunes, Ogle).contains(this.localTime)) {
      obj.now = TimeNames.Gunes;
      obj.next = TimeNames.Ogle;
    } //
    else if (Interval.fromDateTimes(Ogle, Ikindi).contains(this.localTime)) {
      obj.now = TimeNames.Ogle;
      obj.next = TimeNames.Ikindi;
    } //
    else if (Interval.fromDateTimes(Ikindi, Aksam).contains(this.localTime)) {
      obj.now = TimeNames.Ikindi;
      obj.next = TimeNames.Aksam;
    } //
    else if (Interval.fromDateTimes(Aksam, Yatsi).contains(this.localTime)) {
      obj.now = TimeNames.Aksam;
      obj.next = TimeNames.Yatsi;
    }

    return obj;
  }

  isBeforeMidnight(): boolean {
    if (!this.today) return false;

    return (
      this.localTime >
      DateTime.fromFormat(this.today[TimeNames.Imsak], HOUR_FORMAT)
    );
  }

  timer(): TypeTimer {
    if (!this.today || !this.tomorrow) return [0, 0, 0];

    let dateTime = DateTime.fromFormat(this.today[this.time.next], HOUR_FORMAT);

    if (this.time.now === TimeNames.Yatsi) {
      dateTime = DateTime.fromFormat(this.today[TimeNames.Imsak], HOUR_FORMAT);

      if (this.isBeforeMidnight()) {
        dateTime = DateTime.fromFormat(
          this.tomorrow[TimeNames.Imsak],
          HOUR_FORMAT
        ).plus({ days: 1 });
      }
    }

    const ms = dateTime.diff(this.localTime).toMillis();

    return secondSplit(ms / 1000);
  }

  timerRamadan(): TypeTimer {
    if (!this.today || !this.tomorrow) return [0, 0, 0];

    let dateTime = DateTime.fromFormat(this.today[TimeNames.Aksam], HOUR_FORMAT);

    if ([TimeNames.Aksam, TimeNames.Yatsi].includes(this.time.now)) {
      dateTime = DateTime.fromFormat(
        this.tomorrow[TimeNames.Imsak],
        HOUR_FORMAT
      ).plus({ days: 1 });
    }

    const ms = dateTime.diff(this.localTime).toMillis();

    return secondSplit(ms / 1000);
  }

  get iconName(): string {
    if (!this.today || !this.yesterday) return "dolunay";

    let key = this.time.now as string;

    if (this.time.now === TimeNames.Aksam) {
      key = this.today.moonKey;
    } //
    else if (this.time.now === TimeNames.Yatsi) {
      key = this.today.moonKey;

      if (!this.isBeforeMidnight()) {
        key = this.yesterday.moonKey;
      }
    }

    return key;
  }
}
