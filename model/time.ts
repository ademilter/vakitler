import { DateTime } from "luxon";
import { ITime, TimeNames } from "@/types";

export class Time {
  public [TimeNames.Imsak]: string;
  public [TimeNames.Gunes]: string;
  public [TimeNames.Ogle]: string;
  public [TimeNames.Ikindi]: string;
  public [TimeNames.Aksam]: string;
  public [TimeNames.Yatsi]: string;
  public MiladiTarihKisa: string;
  public HicriTarihUzun: string;
  public AyinSekliURL: string;

  constructor(props: ITime) {
    this[TimeNames.Imsak] = props[TimeNames.Imsak];
    this[TimeNames.Gunes] = props[TimeNames.Gunes];
    this[TimeNames.Ogle] = props[TimeNames.Ogle];
    this[TimeNames.Ikindi] = props[TimeNames.Ikindi];
    this[TimeNames.Aksam] = props[TimeNames.Aksam];
    this[TimeNames.Yatsi] = props[TimeNames.Yatsi];
    this.MiladiTarihKisa = props.MiladiTarihKisa;
    this.HicriTarihUzun = props.HicriTarihUzun;
    this.AyinSekliURL = props.AyinSekliURL;
  }

  get moonKey(): string {
    const [_, name] = this.AyinSekliURL.split(
      "http://namazvakti.diyanet.gov.tr/images/"
    );
    return name.split(".")[0];
  }

  get isJumuah(): boolean {
    return (
      DateTime.fromFormat(this.MiladiTarihKisa, "dd.MM.yyyy").weekday === 5
    );
  }
}
