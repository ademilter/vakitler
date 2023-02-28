export type Timer = [number, number, number];

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
  MiladiTarihUzunIso8601: string; // "2023-02-28T00:00:00.0000000+03:00";
}

export enum TimeNames {
  Imsak = "Imsak",
  Gunes = "Gunes",
  Ogle = "Ogle",
  Ikindi = "Ikindi",
  Aksam = "Aksam",
  Yatsi = "Yatsi",
}
