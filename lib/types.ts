export enum TimeNames {
  Fajr = "fajr",
  Sunrise = "sunrise",
  Dhuhr = "dhuhr",
  Asr = "asr",
  Maghrib = "maghrib",
  Isha = "isha",
}

export type DayTimes = [string, string, string, string, string, string];

export type AllTimes = {
  [key: string]: DayTimes;
};

export type Data = null | {
  place: {
    countryCode: string;
    country: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  times: AllTimes;
};
