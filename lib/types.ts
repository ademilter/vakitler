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

export enum HijriMonthNames {
  Muharrem = 1,
  Safer = 2,
  Rebiulevvel = 3,
  Rebiulahir = 4,
  Cemaziyelevvel = 5,
  Cemaziyelahir = 6,
  Recep = 7,
  Saban = 8,
  Ramazan = 9,
  Sevval = 10,
  Zilkade = 11,
  Zilhicce = 12,
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
