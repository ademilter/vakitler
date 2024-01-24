import { TimeNames } from "@/types";

export const HOUR_FORMAT = "HH:mm";
export const HOUR_FORMAT_12 = "h:mm a";
export const API_DATE_FORMAT = "dd.MM.yyyy";

export const LOCAL_KEYS = {
  Settings: "VAKITLER_SETTINGS",
  Data: "VAKITLER_DATA",
  Lang: "VAKITLER_LANG",
  UpdateDate: "VAKITLER_UPDATE_DATE",
};

export const TIMES_COLOR = {
  [TimeNames.Imsak]: "sky",
  [TimeNames.Gunes]: "orange",
  [TimeNames.Ogle]: "amber",
  [TimeNames.Ikindi]: "rose",
  [TimeNames.Aksam]: "blue",
  [TimeNames.Yatsi]: "indigo",
};
