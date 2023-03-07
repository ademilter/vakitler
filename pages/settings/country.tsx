import React, { useContext, useEffect, useState } from "react";
import Container from "@/components/container";
import useTranslation from "next-translate/useTranslation";
import SettingsList from "@/components/settings-list";
import { ICountry } from "@/lib/types";
import { useRouter } from "next/router";
import { CommonStoreContext } from "@/stores/common";

export default function Country() {
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const { countryKey, _settings, _setSettings } =
    useContext(CommonStoreContext);

  const [data, setData] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const url = new URL("/api/countries", window.location.origin);

      const res = await fetch(url.toString());
      const data = await res.json();

      // const turkey = data.find((c: ICountry) => c.UlkeID === "2");
      // const azerbaycan = data.find((c: ICountry) => c.UlkeID === "5");
      // const germany = data.find((c: ICountry) => c.UlkeID === "13");
      // const netherlands = data.find((c: ICountry) => c.UlkeID === "4");
      // const england = data.find((c: ICountry) => c.UlkeID === "15");
      // const france = data.find((c: ICountry) => c.UlkeID === "21");

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="py-10">
      <SettingsList
        inputProps={{
          placeholder: t("settings.searchCountry"),
          name: "country",
        }}
        pushFirst={["2", "5", "13", "4", "15", "21"]}
        onChange={id => {
          const country = data.find(c => c.UlkeID === id);
          _setSettings({ ..._settings, country });
          push(`/settings/region`);
        }}
        data={data.map(c => ({
          value: c.UlkeID,
          label: c[countryKey],
        }))}
      />
    </Container>
  );
}
