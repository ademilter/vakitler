import { Times } from "model/times";

export type TypeTimer = [number, number, number];

export enum TimeFormat {
  Twelve = "12",
  TwentyFour = "24",
}

export interface ICountry {
  UlkeAdi: string; // "ABD",
  UlkeAdiEn: string; // "USA",
  UlkeID: string; // "33"
}

export interface IRegion {
  SehirAdi: string; // "ADIYAMAN";
  SehirAdiEn: string; // "ADIYAMAN";
  SehirID: string; // "501";
}

export interface ICity {
  IlceAdi: string; // "ARNAVUTKOY";
  IlceAdiEn: string; // "ARNAVUTKOY";
  IlceID: string; // "9535";
}

export interface ITime {
  Imsak: string;
  Gunes: string;
  Ogle: string;
  Ikindi: string;
  Aksam: string;
  Yatsi: string;
  KibleSaati: string;
  HicriTarihUzun: string; // "8 Şaban 1444";
  MiladiTarihKisa: string; // "28.02.2023";
  AyinSekliURL: string; // ""http://namazvakti.diyanet.gov.tr/images/i7.gif"";
}

export enum TimeNames {
  Imsak = "Imsak",
  Gunes = "Gunes",
  Ogle = "Ogle",
  Ikindi = "Ikindi",
  Aksam = "Aksam",
  Yatsi = "Yatsi",
}

export interface IRelease {
  id: number;
  draft: boolean;
  name: string;
  body: string;
  prerelease: boolean;
  published_at: string;
  tag_name: string;
  url: string;
}

export interface StoreInterface {
  devMode: boolean;
  setDevMode: (value: boolean) => void;
  settings: {
    country: undefined | ICountry;
    _country: undefined | ICountry;
    region: undefined | IRegion;
    _region: undefined | IRegion;
    city: undefined | ICity;
    _city: undefined | ICity;
    timeFormat: TimeFormat;
    ramadanTimer: boolean;
  };
  setSettings: (value: StoreInterface["settings"]) => void;
  fetchData: (cityId: string) => Promise<void>;
  times: undefined | Times;
  rawTimes: undefined | Times;
  timer: TypeTimer;
  timerRamadan: TypeTimer;
  releases: IRelease[];
  saveSettings: (settings: StoreInterface["settings"]) => void;
  updateTimer: () => void;
  initApp: () => void;
  fetchReleases: () => void;
  checkQueryString: () => void;
  hasLocalData: () => boolean;
}
