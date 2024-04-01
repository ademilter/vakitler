import { DateTime, Interval } from "luxon";
import { ITime, TimeNames, TypeTimer } from "@/types";
import { secondSplit } from "@/utils/helper";
import { HOUR_FORMAT } from "@/utils/const";
import { Time } from "./time";

const timeNames = Object.values(TimeNames);

export class Times {
  public times: Time[];
  public localTime: DateTime;
  public timeTravel: [number, number, number];

  constructor(data: ITime[] = []) {
    this.times = data.map(day => new Time(day));
    this.localTime = DateTime.local();
    this.timeTravel = [0, 0, 0];
  }

  get today(): Time {
    return (
      this.times.find(o => {
        const day = this.localTime.toFormat("dd.MM.yyyy");
        return o.MiladiTarihKisa === day;
      }) || this.times[0]
    );
  }

  get tomorrow(): Time {
    return (
      this.times.find(o => {
        const day = this.localTime.plus({ days: 1 }).toFormat("dd.MM.yyyy");
        return o.MiladiTarihKisa === day;
      }) || this.times[1]
    );
  }

  get yesterday(): Time {
    return (
      this.times.find(o => {
        const day = this.localTime.minus({ days: 1 }).toFormat("dd.MM.yyyy");
        return o.MiladiTarihKisa === day;
      }) || this.times[0]
    );
  }

  get time(): { now: TimeNames; next: TimeNames } {
    const Imsak = DateTime.fromFormat(this.today[TimeNames.Imsak], HOUR_FORMAT);
    const Gunes = DateTime.fromFormat(this.today[TimeNames.Gunes], HOUR_FORMAT);
    const Ogle = DateTime.fromFormat(this.today[TimeNames.Ogle], HOUR_FORMAT);
    const Ikindi = DateTime.fromFormat(
      this.today[TimeNames.Ikindi],
      HOUR_FORMAT
    );
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

  get isBeforeMidnight(): boolean {
    return (
      this.localTime >
      DateTime.fromFormat(this.today[TimeNames.Imsak], HOUR_FORMAT)
    );
  }

  updateTimeTravel(value: [number, number, number]): void {
    this.timeTravel = value;
  }

  updateDateTime(datetime: DateTime): void {
    this.localTime = datetime;
  }

  timer(): TypeTimer {
    let dateTime = DateTime.fromFormat(this.today[this.time.next], HOUR_FORMAT);

    if (this.time.now === TimeNames.Yatsi) {
      dateTime = DateTime.fromFormat(this.today[TimeNames.Imsak], HOUR_FORMAT);

      if (this.isBeforeMidnight) {
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
    let dateTime = DateTime.fromFormat(
      this.today[TimeNames.Aksam],
      HOUR_FORMAT
    );

    if ([TimeNames.Aksam, TimeNames.Yatsi].includes(this.time.now)) {
      dateTime = DateTime.fromFormat(
        this.tomorrow[TimeNames.Imsak],
        HOUR_FORMAT
      ).plus({ days: 1 });
    }

    const ms = dateTime.diff(this.localTime).toMillis();

    return secondSplit(ms / 1000);
  }
}
