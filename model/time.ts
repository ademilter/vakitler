import { DateTime } from "luxon";
import { ITime, TimeNames } from "@/types";
import { Phease } from "@/utils/const";

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

  get moonPhease(): Phease {
    const [_, file] = this.AyinSekliURL.split(
      "http://namazvakti.diyanet.gov.tr/images/"
    );
    const [name, __] = file.split(".");
    return Phease[name as keyof typeof Phease];
  }

  get isJumuah(): boolean {
    return (
      DateTime.fromFormat(this.MiladiTarihKisa, "dd.MM.yyyy").weekday === 5
    );
  }
}
